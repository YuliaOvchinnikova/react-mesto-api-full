import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Home }) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  return (
    <Route>
      {() =>
        token !== null ? <Home email={email} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
