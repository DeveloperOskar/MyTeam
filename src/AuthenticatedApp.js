import React from 'react';
import { auth } from './components/firebase/Config';

const AuthenticatedApp = () => {
  return (
    <div>
      Authenticated{' '}
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
