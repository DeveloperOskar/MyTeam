import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleSignin from '../googleSignIn/GoogleSignIn';
import FacenookSignIn from '../facebookSignIn/FacebookSignIn';
import {
  faAt,
  faKey,
  faUser,
  faCalendar,
  faExclamation,
  faCheckCircle,
  faSignature,
} from '@fortawesome/free-solid-svg-icons';
import { auth, firestore } from '../firebase/Config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ValidateEmailInput,
  ValidateNameInput,
  ValidatePasswordInput,
  ValidateBirthDate,
  ValidatePasswordMatch,
  ValidateAccountType,
} from '../helpers/Validation';
const SignUp = () => {
  const History = useHistory();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [Lastname, setLastname] = useState('');
  const [BirthDate, setBirthDate] = useState('');
  const [AccountType, setAccountType] = useState('0');
  const [IsLoading, setIsLoading] = useState(false);
  /*Input refs*/
  const EmailErrorMsg = useRef(null);
  const PasswordErrorMsg = useRef(null);
  const RePasswordErrorMsg = useRef(null);
  const BirthDateErrorMsg = useRef(null);
  const FirstNameErrorMsg = useRef(null);
  const LastNameErrorMsg = useRef(null);
  const AccountTypeMsg = useRef(null);
  const signupFeedbackMsg = useRef(null);

  useEffect(() => {
    if (IsLoading) {
      document.querySelector('#loading-screen-container').style.display =
        'flex';
    } else {
      document.querySelector('#loading-screen-container').style.display =
        'none';
    }
  }, [IsLoading]);

  const showSignInContainer = () => {
    document.querySelector('#mobile-sign-in-cover').style.display = 'flex';
    document.querySelector('html').style.overflowY = 'auto';
  };

  const SignUpUserWithCredentials = async (event) => {
    event.preventDefault();
    if (
      Email !== '' &&
      Password !== '' &&
      RePassword !== '' &&
      FirstName !== '' &&
      Lastname !== '' &&
      BirthDate !== ''
    ) {
      if (!ValidateEmailInput(Email)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Email is invalid! Please enter a valid email!';
      } else if (!ValidatePasswordInput(Password)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Password is invalid! Please enter a valid Password!';
      } else if (!ValidatePasswordMatch(Password, RePassword)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Passwords do not match!';
      } else if (!ValidateBirthDate(BirthDate)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Please select a valid birthdate!';
      } else if (!ValidateNameInput(FirstName)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Invalid firstname!';
      } else if (!ValidateNameInput(Lastname)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML = 'Signup error! Invalid Lastname!';
      } else if (!ValidateAccountType(AccountType)) {
        signupFeedbackMsg.current.style.display = 'block';
        signupFeedbackMsg.current.innerHTML =
          'Signup error! Please select a account type!';
      } else {
        try {
          setIsLoading(true);
          const user = await auth.createUserWithEmailAndPassword(
            Email,
            Password
          );
          await user.user.sendEmailVerification();
          await user.user.updateProfile({
            displayName: `${FirstName} ${Lastname}`,
          });
          const users = await firestore.collection('/users');
          await users.doc(Email).set({
            hasAllData: true,
            typeOfAcc: parseInt(AccountType),
            birthDate: BirthDate,
          });
          setIsLoading(false);
          History.push('/');
          return;
        } catch (error) {
          setIsLoading(false);
          signupFeedbackMsg.current.style.backgroundColor = '#ff3333c0';
          signupFeedbackMsg.current.style.display = 'block';
          signupFeedbackMsg.current.innerHTML = `Signup error! ${error.message}`;
        }
      }
    } else {
      return;
    }
  };
  const removeSingUpFeedBackError = () => {
    signupFeedbackMsg.current.style.display = 'none';
  };

  const HandleInputError = (
    value,
    result,
    errorMsgElementRef,
    successIconID,
    errorIconID,
    errorMsg
  ) => {
    if (value === '') {
      document.querySelector(errorIconID).style.display = 'none';
      errorMsgElementRef.current.style.display = 'none';
      return;
    }

    if (!result) {
      document.querySelector(successIconID).style.display = 'none';
      document.querySelector(errorIconID).style.display = 'block';
      errorMsgElementRef.current.style.display = 'block';
      errorMsgElementRef.current.innerHTML = errorMsg;
    } else {
      errorMsgElementRef.current.style.display = 'none';
      document.querySelector(successIconID).style.display = 'block';
      document.querySelector(errorIconID).style.display = 'none';
    }
  };

  return (
    <div>
      <main id='main-container'>
        <form id='sign-up-form' onSubmit={SignUpUserWithCredentials}>
          <div className='mb1'>
            <img
              src='/imgs/Brand-logo-min.png'
              alt='brands logo'
              id='brand-logo-singup'
              className='mt2'
            />
            <h1 className='gradient-text'>My Team</h1>
            <p className='gray-text'>Create a account</p>
          </div>
          <div ref={signupFeedbackMsg} id='signup-error-container'></div>

          <div className='one-input-wrapper mt2'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              className='valid-input-icon'
              id='accounttype-valid-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='accounttype-error-icon'
              className='error-msg-icon'
            />

            <select
              className='signup-input'
              name='Signup-select'
              id='Signup-select'
              onChange={(event) => {
                removeSingUpFeedBackError();
                setAccountType(event.target.value);
                const result = ValidateAccountType(event.target.value);
                HandleInputError(
                  event.target.value,
                  result,
                  AccountTypeMsg,
                  '#accounttype-valid-icon',
                  '#accounttype-error-icon',
                  'Select your account type!'
                );
              }}
            >
              <option defaultValue value='0'>
                Select your account type
              </option>
              <option value='1'>Athlete</option>
              <option value='2'>Coach</option>
            </select>

            <FontAwesomeIcon icon={faUser} color='gray' />
          </div>
          <hr id='select' className='signup-inputline' />
          <div className='error-msg ' ref={AccountTypeMsg}></div>

          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              className='valid-input-icon'
              id='email-valid-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='email-error-icon'
              className='error-msg-icon'
            />
            <input
              onChange={(event) => {
                removeSingUpFeedBackError();
                setEmail(event.target.value.toLowerCase());
                const result = ValidateEmailInput(event.target.value);
                HandleInputError(
                  event.target.value,
                  result,
                  EmailErrorMsg,
                  '#email-valid-icon',
                  '#email-error-icon',
                  'Invalid Email'
                );
              }}
              className='signup-input'
              minLength='2'
              maxLength='40'
              type='email'
              required
              placeholder='Email'
            />
            <FontAwesomeIcon icon={faAt} color='gray' />
          </div>
          <hr className='signup-inputline' />
          <div className='error-msg mb1' ref={EmailErrorMsg}></div>
          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              id='password-valid-icon'
              className='valid-input-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='password-error-icon'
              className='error-msg-icon'
            />
            <input
              onChange={(event) => {
                removeSingUpFeedBackError();
                setPassword(event.target.value);
                const result = ValidatePasswordInput(event.target.value);
                HandleInputError(
                  event.target.value,
                  result,
                  PasswordErrorMsg,
                  '#password-valid-icon',
                  '#password-error-icon',
                  'Invalid Password! Minimum eight characters, at least one uppercase letter, one lowercase letter and one number!'
                );
              }}
              className='signup-input'
              title='Password must be between 8-30 characters long and contain atleast 1 uppercase, lowecaser letter and number'
              pattern='(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}'
              minLength='8'
              maxLength='30'
              type='password'
              placeholder='Password'
              required
            />
            <FontAwesomeIcon icon={faKey} color='gray' />
          </div>
          <hr className='signup-inputline' />
          <div className='error-msg mb1' ref={PasswordErrorMsg}></div>
          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              id='repassword-valid-icon'
              className='valid-input-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='repassword-error-icon'
              className='error-msg-icon'
            />
            <input
              onChange={(event) => {
                removeSingUpFeedBackError();
                setRePassword(event.target.value);
                const result = ValidatePasswordMatch(
                  Password,
                  event.target.value
                );
                HandleInputError(
                  event.target.value,
                  result,
                  RePasswordErrorMsg,
                  '#repassword-valid-icon',
                  '#repassword-error-icon',
                  'Passwords do not match!'
                );
              }}
              className='signup-input'
              type='password'
              placeholder='Repete password'
              required
            />
            <FontAwesomeIcon icon={faKey} color='gray' />
          </div>
          <hr className='signup-inputline' />
          <div className='error-msg mb1' ref={RePasswordErrorMsg}></div>
          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              id='birthdate-valid-icon'
              className='valid-input-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='birthdate-error-icon'
              className='error-msg-icon'
            />
            <DatePicker
              onChange={(date) => {
                removeSingUpFeedBackError();
                document
                  .querySelector('#calender-icon') //Bugg fix so calender icon align with the other icons
                  .classList.replace('mr2', 'mr1');
                document.querySelector('.datePicker').style.width = '232px';
                setBirthDate(date);
                const result = ValidateBirthDate(date);
                HandleInputError(
                  date,
                  result,
                  BirthDateErrorMsg,
                  '#birthdate-valid-icon',
                  '#birthdate-error-icon',
                  'Invalid Birthdate! We only accept users between 16-100 years old!'
                );
              }}
              selected={BirthDate}
              peekNextMonth
              required
              showMonthDropdown
              className='datePicker'
              showYearDropdown
              placeholderText='Select your Birthdate'
              dropdownMode='select'
            />
            <FontAwesomeIcon
              icon={faCalendar}
              color='gray'
              className='mr2'
              id='calender-icon'
            />
          </div>
          <hr className='signup-inputline' />
          <div className='error-msg mb1' ref={BirthDateErrorMsg}></div>
          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              id='firstname-valid-icon'
              className='valid-input-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='firstname-error-icon'
              className='error-msg-icon'
            />
            <input
              onChange={(event) => {
                removeSingUpFeedBackError();
                setFirstName(event.target.value.toLowerCase());
                const result = ValidateNameInput(event.target.value);
                HandleInputError(
                  event.target.value,
                  result,
                  FirstNameErrorMsg,
                  '#firstname-valid-icon',
                  '#firstname-error-icon',
                  'Firstname have to be between 2-30 characters and can only contain letters!'
                );
              }}
              className='signup-input'
              minLength='2'
              maxLength='30'
              type='text'
              placeholder='Firstname'
              required
            />
            <FontAwesomeIcon icon={faSignature} color='gray' />
          </div>
          <hr className='signup-inputline' />
          <div className='error-msg mb1' ref={FirstNameErrorMsg}></div>

          <div className='one-input-wrapper mt1'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color='#5cb85c'
              id='lastname-valid-icon'
              className='valid-input-icon'
            />
            <FontAwesomeIcon
              icon={faExclamation}
              color='red'
              id='lastname-error-icon'
              className='error-msg-icon'
            />
            <input
              onChange={(event) => {
                removeSingUpFeedBackError();
                setLastname(event.target.value.toLowerCase());
                const result = ValidateNameInput(event.target.value);
                HandleInputError(
                  event.target.value,
                  result,
                  LastNameErrorMsg,
                  '#lastname-valid-icon',
                  '#lastname-error-icon',
                  'Lasname have to be between 2-30 characters and can only contain letters!'
                );
              }}
              className='signup-input'
              minLength='2'
              maxLength='30'
              type='text'
              placeholder='Lastname'
              required
            />
            <FontAwesomeIcon icon={faSignature} color='gray' />
          </div>
          <hr className='signup-inputline mb1' />
          <div className='error-msg mb' ref={LastNameErrorMsg}></div>

          <button type='submit' className='signInButton signup-button  mt2'>
            Sign Up
          </button>
          <p className='gray-text my2'>- or -</p>
          <GoogleSignin onClick={showSignInContainer} />
          <FacenookSignIn onClick={showSignInContainer} />
        </form>

        <div id='sign-up-img-container'></div>
      </main>
    </div>
  );
};

export default SignUp;
