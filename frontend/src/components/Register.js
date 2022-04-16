import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import InfoTooltip from './InfoTooltip';

export default function Register({
  registrationSubmit,
  registratinOnCloseFail,
  registrationOnCloseSuccess,
  successRegistration,
  failedRegistration,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    registrationSubmit(email, password);
  }

  return (
    <div className="page">
      {successRegistration && (
        <InfoTooltip isSuccess={true} onClose={registrationOnCloseSuccess} />
      )}
      {failedRegistration && (
        <InfoTooltip isSuccess={false} onClose={registratinOnCloseFail} />
      )}

      <Header>
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Header>
      <div className="checkin-block">
        <h1 className="checkin-block__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            className="form__input"
            name="email"
            type="email"
            placeholder="Почта"
            value={email}
            onChange={handleChangeEmail}
          ></input>
          <input
            className="form__input"
            name="c"
            type="text"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <button className="form__button interactive-button" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <p className="checkin-block__link">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="checkin-block__link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
