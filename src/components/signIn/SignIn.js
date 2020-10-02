import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css';
import GoogleSignIn from '../googleSignIn/GoogleSignIn';
import FaceBookSignIn from '../facebookSignIn/FacebookSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import {
  ValidateEmailInput,
  ValidatePasswordInput,
} from '../helpers/Validation';
import { auth, googleProvider, facebookProvider } from '../firebase/Config';
const SignIn = ({ toggleLoginContainer }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const signInErrorMsg = useRef('');
  const History = useHistory();
  useEffect(() => {
    if (IsLoading) {
      document.querySelector('#loading-screen-container').style.display =
        'flex';
    } else {
      document.querySelector('#loading-screen-container').style.display =
        'none';
    }
  }, [IsLoading]);
  const SignInWithGoogle = async () => {
    try {
      const user = await auth.signInWithPopup(googleProvider);
      if (user) {
        History.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignInWithFaceBook = async () => {
    try {
      const user = await auth.signInWithPopup(facebookProvider);
      if (user) {
        History.push('/');
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        DisplayError(
          'The email is already registred with another login option!'
        );
      }
    }
  };

  const SignInUserWithCredentials = async () => {
    if (!ValidateEmailInput(Email)) {
      DisplayError('Invalid Email');
    } else if (!ValidatePasswordInput(Password)) {
      DisplayError('Invalid Password');
    } else {
      try {
        setIsLoading(true);
        await auth.signInWithEmailAndPassword(Email, Password);
        setIsLoading(false);
        History.push('/');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        switch (error.code) {
          case 'auth/invalid-email':
            DisplayError('Sign In Failed! Invalid credentials!');
            break;
          case 'auth/wrong-password':
            DisplayError('Sign In Failed! Invalid credentials!');
            break;
          case 'auth/user-not-found':
            DisplayError('Sign In Failed! Invalid credentials!');
            break;

          default:
            DisplayError(
              'Sign In Failed! Something went wrong! Please try later!'
            );
            break;
        }
      }
    }
  };

  const DisplayError = (errorMsg) => {
    signInErrorMsg.current.innerHTML = errorMsg;
    signInErrorMsg.current.style.display = 'block';
    document.querySelector('#sign-in-error-icon ').style.display = 'block';
  };

  const RemoveErrorMsg = () => {
    signInErrorMsg.current.innerHTML = '';
    signInErrorMsg.current.style.display = 'none';
    document.querySelector('#sign-in-error-icon ').style.display = 'none';
  };
  return (
    <div id='mobile-sign-in-cover'>
      <h1 id='sign-in-header' className='color-white mt2 mb2'>
        Sign In
      </h1>
      <FontAwesomeIcon
        icon={faExclamation}
        size='3x'
        color='#ff3333c0'
        className='mb2'
        id='sign-in-error-icon'
      />
      <p
        id='sign-in-error'
        className='color-white mb1'
        ref={signInErrorMsg}
      ></p>

      <input
        className='mb1'
        type='email'
        required
        placeholder='Email'
        onChange={(event) => {
          setEmail(event.target.value);
          RemoveErrorMsg();
        }}
      />
      <input
        className='mb2'
        type='password'
        required
        placeholder='Password'
        onChange={(event) => {
          setPassword(event.target.value);
          RemoveErrorMsg();
        }}
      />
      <button
        className='mb1 signInButton'
        type='button'
        onClick={SignInUserWithCredentials}
      >
        Sign In
      </button>

      <GoogleSignIn onClick={SignInWithGoogle} />
      <FaceBookSignIn onClick={SignInWithFaceBook} />

      <button
        className='abortButton mt1'
        type='submit'
        onClick={() => {
          toggleLoginContainer();
          RemoveErrorMsg();
        }}
      >
        Abort
      </button>
    </div>
  );
};

export default SignIn;
