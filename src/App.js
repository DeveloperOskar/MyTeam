import React from 'react';
import { auth } from './components/firebase/Config';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useDocumentData } from 'react-firebase-hooks/firestore';
import UnAuthenticatedApp from './unAuthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import EmailVerificationWall from './components/helpers/EmailVerificationWall';

function App() {
  const [user] = useAuthState(auth);
  if (user == null) {
    return (
      <>
        <UnAuthenticatedApp />{' '}
      </>
    );
  } else {
    if (!user.emailVerified) {
      return <EmailVerificationWall />;
    } else {
      return <AuthenticatedApp />;
    }
  }
}

export default App;
