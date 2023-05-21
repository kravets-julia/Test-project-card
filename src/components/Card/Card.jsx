import UserCard from 'components/CardItem/CardItem';
import { fetchInfo } from 'components/Fetch/Fetch';
import React, { useState, useEffect } from 'react';
import css from './Card.module.css';

// import UserCard from "../UserCard/UserCard";
// import Selected from "../Selected/Selected";
// import LoadMore from "../LoadMore/LoadMore";
// import picture from "../../assets/picture.png";
// import css from "./usersList.module.css";
// import cssC from "../../components/UserCard/UserCard.module.css";

export default function UsersList() {
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [card, setCard] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [followCheck] = useState('');
  const limit = 3;

  useEffect(() => {
    const getUsers = async ({ page, limit, selected }) => {
      try {
        return await fetchInfo(page, limit, selected).then(data => {
          if (data && data.length < limit) {
            setShowLoadMoreBtn(false);
          } else {
            setShowLoadMoreBtn(true);
          }

          setCard([...card, ...data]);
        });
      } catch (error) {
        alert(error);
      }
    };

    getUsers({ page: pageNumber, limit: limit, selected: followCheck });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, followCheck]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className={css.boxContainer}>
      <ul className={css.cardList}>
        {card && card.length > 0 ? (
          card.map(card => <UserCard key={card.id} card={card} />)
        ) : (
          <p>There is nothing here...</p>
        )}
      </ul>
      {showLoadMoreBtn && (
        <button type="button" onClick={handleLoadMore} className={css.LoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
