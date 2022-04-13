import React from 'react';
import doneLogo from '../images/done.svg';
import wrongLogo from '../images/wrong.svg';

export default function InfoTooltip({ isSuccess, onClose }) {
  return (
    <div className={`popup popup_opened`}>
      <div className="popup__container ">
        <button
          type="button"
          aria-label="Закрыть редактирование информации"
          className="interactive-button popup__close-button"
          onClick={onClose}
        ></button>

        {isSuccess ? (
          <>
            <img className="popup__icon" src={doneLogo} alt="done logo" />
            <p className="popup__info">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img className="popup__icon" src={wrongLogo} alt="wrong logo" />
            <p className="popup__info">Что-то пошло не так!</p>
            <p className="popup__info">Попробуйте еще раз</p>
          </>
        )}
      </div>
    </div>
  );
}
