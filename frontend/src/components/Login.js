import React, { useState } from 'react';
import Header from './Header';

import { Link } from 'react-router-dom';

import InfoTooltip from './InfoTooltip';

export default function Login({ loginSubmit, failedLogin, loginOnClose }) {
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

    loginSubmit(email, password);
  }

  return (
    <div className="page">
      {failedLogin && <InfoTooltip isSuccess={false} onClose={loginOnClose} />}

      <Header>
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Header>
      <div className="checkin-block">
        <h1 className="checkin-block__title">Вход</h1>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
