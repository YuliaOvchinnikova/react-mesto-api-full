import React from 'react';
import { useState, useEffect } from 'react';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api.js';

import Home from './Home';
import { login, register } from '../Auth';

export default function App() {
  const history = useHistory();

  const [failedLogin, setFailedLogin] = useState(false);

  const [successRegistration, setSuccessRegistration] = useState(false);
  const [failedRegistration, setFailedRegistration] = useState(false);

  const [userAuthorized, setUserAuthorized] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        if (res && res.data.email !== '') {
          localStorage.setItem('email', res.data.email);
          setUserInfoLoading(false);
          setUserAuthorized(true);
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setUserInfoLoading(false);
          history.push('/sign-in');
        } else {
          console.log(err.text);
        }
      });
  }, [userInfoLoading, userAuthorized, history]);

  function loginSubmit(email, password) {
    if (!email || !password) {
      setFailedLogin(true);
      return;
    }

    login(email, password)
      .then((res) => {
        localStorage.setItem('email', email);
        setUserAuthorized(true);
        history.push('/');
      })
      .catch((err) => {
        setFailedLogin(true);
        console.log(err);
      });
  }

  function loginOnClose() {
    setFailedLogin(false);
    history.push('/sign-in');
  }

  function registrationSubmit(email, password) {
    register(email, password)
      .then(() => {
        setSuccessRegistration(true);
      })
      .catch((err) => {
        setFailedRegistration(true);
        console.log(err);
      });
  }

  function registratinOnCloseFail() {
    setFailedRegistration(false);
    setSuccessRegistration(false);
  }

  function registrationOnCloseSuccess() {
    history.push('/signup');
  }

  if (userInfoLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Home}
          autorized={userAuthorized}
        />

        <Route path="/sign-up">
          <Register
            registrationSubmit={registrationSubmit}
            registratinOnCloseFail={registratinOnCloseFail}
            registrationOnCloseSuccess={registrationOnCloseSuccess}
            successRegistration={successRegistration}
            failedRegistration={failedRegistration}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            loginSubmit={loginSubmit}
            loginOnClose={loginOnClose}
            failedLogin={failedLogin}
          />
        </Route>
        <Route>
          {userAuthorized ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
    </>
  );
}
