import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyAj-bKXvCOl4b9xUrmm81-07owBaCNvmuE',
  authDomain: 'myteam-1459e.firebaseapp.com',
  databaseURL: 'https://myteam-1459e.firebaseio.com',
  projectId: 'myteam-1459e',
  storageBucket: 'myteam-1459e.appspot.com',
  messagingSenderId: '3329311068',
  appId: '1:3329311068:web:82231ea1c6fccf56484199',
  measurementId: 'G-367RTEPJ1T',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
export { auth, firestore, googleProvider, facebookProvider };
