import React from 'react';
import AuthenticatedNavbar from './authenticatedComponents/AuthenticatedNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './components/firebase/Config';
import { useAuthState } from 'react-firebase-hooks/auth';
const AuthenticatedApp = () => {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <AuthenticatedNavbar userPhotoUrl={user.photoURL} />
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
      <Switch></Switch>
    </Router>
  );
};

export default AuthenticatedApp;
