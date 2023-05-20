import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { cardReducer } from './CardSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { followerReducer } from './FollowerSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['card', 'followers'],
};

const rootReducer = combineReducers({
  card: cardReducer,
  followers: followerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
