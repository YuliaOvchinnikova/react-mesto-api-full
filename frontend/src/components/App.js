import React from 'react';
import { useState, useEffect } from 'react';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import Home from './Home';
import { checkToken, login, register } from '../Auth';

export default function App() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const [failedLogin, setFailedLogin] = useState(false);

  const [successRegistration, setSuccessRegistration] = useState(false);
  const [failedRegistration, setFailedRegistration] = useState(false);

  useEffect(() => {
    if (token === undefined || token === null) {
      return;
    }
    checkToken(token)
      .then((res) => {
        if (res && res.data.email !== '') {
          localStorage.setItem('email', res.data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, history]);

  function loginSubmit(email, password) {
    if (!email || !password) {
      setFailedLogin(true);
      return;
    }

    login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', email);

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

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />

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
          {token !== null ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
    </>
  );
}
