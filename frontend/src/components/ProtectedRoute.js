import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Home, autorized }) => {
  const email = localStorage.getItem('email');

  return (
    <Route>
      {() => (autorized ? <Home email={email} /> : <Redirect to="/sign-in" />)}
    </Route>
  );
};

export default ProtectedRoute;
