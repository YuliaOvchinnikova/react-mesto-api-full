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
  const [email, setEmail] =
    useState('');
  const [name, setName] = useState('');
  const [about, setAbout] =
    useState('');
  const [password, setPassword] =
    useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    registrationSubmit(
      email,
      name,
      about,
      password
    );
  }

  return (
    <div className="page">
      {successRegistration && (
        <InfoTooltip
          isSuccess={true}
          onClose={
            registrationOnCloseSuccess
          }
        />
      )}
      {failedRegistration && (
        <InfoTooltip
          isSuccess={false}
          onClose={
            registratinOnCloseFail
          }
        />
      )}

      <Header>
        <Link
          className="header__link"
          to="/sign-in"
        >
          Log in
        </Link>
      </Header>
      <div className="checkin-block">
        <h1 className="checkin-block__title">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="form"
        >
          <input
            className="form__input"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          ></input>
          <input
            className="form__input"
            name="name"
            type="name"
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
          ></input>
          <input
            className="form__input"
            name="about"
            type="about"
            placeholder="About"
            value={about}
            onChange={handleChangeAbout}
          ></input>
          <input
            className="form__input"
            name="c"
            type="text"
            placeholder="Password"
            value={password}
            onChange={
              handleChangePassword
            }
          ></input>
          <button
            className="form__button interactive-button"
            type="submit"
          >
            Sign up
          </button>
        </form>

        <p className="checkin-block__link">
          Have you already
          registered?&nbsp;
          <Link
            to="/sign-in"
            className="checkin-block__link"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
