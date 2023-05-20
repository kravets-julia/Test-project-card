import { createSelector } from '@reduxjs/toolkit';

export const selectCard = state => state.card;
export const selectFollowers = state => state.followers;

export const selectedCard = createSelector(
  [selectCard, selectFollowers],
  (card, followers) => {
    return card.filter(card =>
      card.name.toLowerCase().includes(followers.toLowerCase())
    );
  }
);
