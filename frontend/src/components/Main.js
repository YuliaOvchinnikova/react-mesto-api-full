import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__about-person">
          <div
            className="profile__photo-container interactive-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__photo"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать профайл"
              className="interactive-button profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить карточку с местом"
          className="interactive-button profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="places" aria-label="Фотографии мест">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onDeleteCard={onCardDelete}
            key={card._id}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
