function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_photo popup_opacity_dark ${
        card ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container popup__container_type_photo">
        <button
          type="button"
          aria-label="Закрыть редактирование информации"
          className="interactive-button popup__close-button"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__opened-image"
            src={card?.link}
            alt={card?.name}
          />
          <figcaption className="popup__figcaption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
