import {
  useEffect,
  useState,
} from 'react';
import api from '../utils/Api.js';

function ImagePopup({ card, onClose }) {
  const [user, setUser] = useState();

  useEffect(() => {
    api
      .getSpecificUserInfoById(
        card.owner
      )
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

  return (
    <div
      className={`popup popup_photo popup_opacity_dark ${
        card ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container popup__container_type_photo">
        <button
          type="button"
          aria-label="Close info editing"
          className="interactive-button popup__close-button"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__opened-image"
            src={card?.link}
            alt={card?.name}
          />
          <figcaption className="popup__figcaption">
            {card?.name} by {user?.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
