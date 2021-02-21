

// declares firebase
const firebase = require('firebase/app');

//authentication libraries

require('firebase/auth');
//link firebase to the project
var firebaseConfig = {
    apiKey: "AIzaSyBrCjW8cjmujI_DdIUX-KE9-p39PDAILBc",
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
