import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { signout } from '../Auth';

function Home({ email }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState(undefined);

  const [cards, setCards] = useState([]);

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then(({ data }) => {
          const newCards = cards.map((c) => {
            if (c._id === card._id) {
              return data;
            } else {
              return c;
            }
          });
          setCards(newCards);
        })
        .catch((err) => {
          if (err.status === 401) {
            history.push('/sign-in');
          } else {
            console.log(err.text);
          }
        });
    } else {
      api
        .unlikeCard(card._id)
        .then(({ data }) => {
          const newCards = cards.map((c) => {
            if (c._id === card._id) {
              return data;
            } else {
              return c;
            }
          });
          setCards(newCards);
        })
        .catch((err) => {
          if (err.status === 401) {
            history.push('/sign-in');
          } else {
            console.log(err.text);
          }
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then(({ data }) => {
        setCards(data);
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }, [history]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }, [history]);

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then(({ data }) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .changeUserInfo(name, about)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }

  function signOut() {
    signout()
      .then(() => {
        localStorage.removeItem('email');
        history.push('/sign-in');
      })
      .catch((err) => {
        if (err.status === 401) {
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }

  if (currentUser === undefined) {
    return <div></div>;
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header>
          <div className="header__container">
            <p className="header__email">{email}</p>

            <button onClick={signOut} className="header__link">
              Выйти
            </button>
          </div>
        </Header>

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeleteCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          buttonText="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default Home;
