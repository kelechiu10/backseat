

// declares firebase
const firebase = require('firebase/app');
const key = require('./auth.json').firebase_key;

//authentication libraries

require('firebase/auth');
//link firebase to the project
var firebaseConfig = {
    apiKey: key,
    authDomain: "ridesurf-53842.firebaseapp.com",
    projectId: "ridesurf-53842",
    storageBucket: "ridesurf-53842.appspot.com",
    messagingSenderId: "89267977016",
    appId: "1:89267977016:web:8fc0b0df929a49ed1e1fcd",
    measurementId: "G-NLXKVX5TTC"
  };

// initialize an app
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
