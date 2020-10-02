import React from 'react';
import AuthenticatedNavbar from './authenticatedComponents/AuthenticatedNavbar';
import { auth } from './components/firebase/Config';
import { useAuthState } from 'react-firebase-hooks/auth';
const AuthenticatedApp = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <AuthenticatedNavbar userPhotoUrl={user.photoURL} />
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default AuthenticatedApp;
