import { useCallback, useEffect, useState } from 'react';
import css from './Card.module.css';
import img from '../Img/picture2.png';
import logo from '../Img/logo.png';
import { useDispatch } from 'react-redux';
import { updateFetchCard } from 'components/Fetch/UpdateFetchCard';
import { fetchGetCard } from 'components/Redux/Options';

const UserCard = () => {
  const [card, setCard] = useState([]);
  const [followingStatus, setFollowingStatus] = useState({});
  const [count, setCount] = useState(Number(3));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCard()).then(response => {
      const infoCard = response.payload;
      setCard(infoCard);
    });
  }, [dispatch]);

  useEffect(() => {
    const statusOfStorage = {};
    card.forEach(card => {
      const storedFollowingStatus = localStorage.getItem(
        `followingStatus_${card.id}`
      );
      if (storedFollowingStatus !== null) {
        statusOfStorage[card.id] = storedFollowingStatus === 'true';
      }
    });
    setFollowingStatus(statusOfStorage);
  }, [card]);

  function addCard() {
    const newCount = count + 3;
    setCount(newCount);
  }

  const handleClick = useCallback(
    async (event, cardId, following) => {
      const updatedCard = card.map(card => {
        if (card.id === cardId) {
          const updatedFollowers = following
            ? card.followers - 1
            : card.followers + 1;
          updateFetchCard(card.id, updatedFollowers)
            .then(response => {
              setCard(prevCard => {
                return prevCard.map(prevCard => {
                  if (prevCard.id === cardId) {
                    return {
                      ...prevCard,
                      following: !prevCard.following,
                      followers: updatedFollowers,
                    };
                  }
                  return prevCard;
                });
              });
              setFollowingStatus(prevStatus => ({
                ...prevStatus,
                [cardId]: !prevStatus[cardId],
              }));
              localStorage.setItem(
                `followingStatus_${cardId}`,
                (!following).toString()
              );
            })
            .catch(error => {
              console.error('Error updating user:', error);
            });
        }
        return card;
      });
      setCard(updatedCard);
    },
    [card]
  );

  return (
    <div className={css.container}>
      {card && (
        <ul className={css.cardList}>
          {card.slice(0, count).map(el => (
            <li key={el.id} className={css.card}>
              <div>
                <img src={`${logo}`} alt="logo GoIt" className={css.logo} />
              </div>
              <div>
                <img
                  src={`${img}`}
                  alt="screen saver"
                  className={css.picture}
                />
              </div>
              <div className={css.lineAvatar}></div>
              <div className={css.imgAvatar}>
                <img src={`${el.avatar}`} alt={el.user} className={css.img} />
              </div>
              {/* <p>{el.user}</p> */}
              <p className={css.followers}>
                {el.followers.toLocaleString('en-US')} followers
              </p>
              <p className={css.tweets}> {el.tweets} tweets</p>
              <button
                className={css.FollowBtn}
                following={followingStatus[card.id]}
                onClick={event =>
                  handleClick(event, card.id, followingStatus[card.id])
                }
              >
                <p className={css.TextBtn}>
                  {followingStatus[card.id] ? 'Following' : 'Follow'}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {count <= card.length && (
        <button className={css.LoadMore} onClick={addCard}>
          LoadMore
        </button>
      )}
    </div>
  );
};

export default UserCard;
