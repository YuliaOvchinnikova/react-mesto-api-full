import React from 'react';
import doneLogo from '../images/done.svg';
import wrongLogo from '../images/wrong.svg';

export default function InfoTooltip({
  isSuccess,
  onClose,
}) {
  return (
    <div
      className={`popup popup_opened`}
    >
      <div className="popup__container ">
        <button
          type="button"
          aria-label="Close edit information"
          className="interactive-button popup__close-button"
          onClick={onClose}
        ></button>

        {isSuccess ? (
          <>
            <img
              className="popup__icon"
              src={doneLogo}
              alt="done logo"
            />
            <p className="popup__info">
              You have successfully
              registered!
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__icon"
              src={wrongLogo}
              alt="wrong logo"
            />
            <p className="popup__info">
              Something went wrong!
            </p>
            <p className="popup__info">
              Try again
            </p>
          </>
        )}
      </div>
    </div>
  );
}
