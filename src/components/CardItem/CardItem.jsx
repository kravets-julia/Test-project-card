import React, { useState } from 'react';
import img from '../Img/picture2.png';
import logo from '../Img/logo.png';
import css from '../Card/Card.module.css';
import { updateFetchCard } from 'components/Fetch/UpdateFetchCard';

export default function UserCard(card) {
  const [selection, setSelection] = useState(card.card.followed);
  const [followersCount, setFollowersCount] = useState(card.card.followers);

  const handleClick = () => {
    setSelection(!selection);
    if (selection) {
      updateFetchCard(card.card.id, {
        followed: !selection,
        followers: followersCount - 1,
      });
      setFollowersCount(followersCount - 1);
    }
    if (!selection) {
      updateFetchCard(card.card.id, {
        followed: !selection,
        followers: followersCount + 1,
      });
      setFollowersCount(followersCount + 1);
    }
  };

  return (
    <li className={css.card} id={card.card.id}>
      <div>
        <img src={`${logo}`} alt="logo GoIt" className={css.logo} />
      </div>
      <div>
        <img src={`${img}`} alt="screen saver" className={css.picture} />
      </div>
      <div className={css.lineAvatar}></div>
      <div className={css.imgAvatar}>
        <img
          src={`${card.card.avatar}`}
          alt={card.card.user}
          className={css.img}
        />
      </div>
      <div>
        <p className={css.tweets}>{card.card.tweets} tweets</p>
        <p className={css.followers}>
          {followersCount.toLocaleString('en-US')} followers
          {/* {followersCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '} */}
        </p>
        <button
          type="button"
          className={css.FollowBtn}
          style={{ background: selection ? '#5CD3A8' : '#EBD8FF' }}
          onClick={() => handleClick(card.id)}
        >
          <p className={css.TextBtn}>{selection ? 'following' : 'follow'}</p>
        </button>
      </div>
    </li>
  );
}
