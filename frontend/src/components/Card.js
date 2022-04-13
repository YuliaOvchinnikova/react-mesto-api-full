import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Card({ card, onCardClick, onDeleteCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `interactive-button place__trash ${
    isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `place__like ${
    isLiked ? 'place__like_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="place">
      <img
        src={card.link}
        className="place__image"
        alt={card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить место"
        className={cardDeleteButtonClassName}
        onClick={() => onDeleteCard(card)}
      ></button>
      <div className="place__container">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button
            type="button"
            aria-label="Лайкнуть место"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <p className="place__counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
