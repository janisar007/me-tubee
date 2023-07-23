import firebase from 'firebase/app';

import 'firebase/auth'; //after setting authentication in fb.

const firebaseConfig = {
    apiKey: "AIzaSyCvm8-lrS360nASo0ClmOqCZJWbou3L3-I",
    authDomain: "me-tube-pro.firebaseapp.com",
    projectId: "me-tube-pro",
    storageBucket: "me-tube-pro.appspot.com",
    messagingSenderId: "806183971494",
    appId: "1:806183971494:web:e3401f2334914026772267"
  };

  //to initiallize firebase i our app ->
  firebase.initializeApp(firebaseConfig); //thats is. my app ki connected to firebase.

  export default firebase.auth(); //after setting authentication in fb.