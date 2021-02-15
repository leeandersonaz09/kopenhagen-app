import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD1LIBmK8XKvTy8AOaY8sHTSQj77e7VsYc",
  authDomain: "kopenhagenapp-4e26f.firebaseapp.com",
  projectId: "kopenhagenapp-4e26f",
  storageBucket: "kopenhagenapp-4e26f.appspot.com",
  messagingSenderId: "1046487630212",
  appId: "1:1046487630212:web:0d87b6943ac9a5aab29dd1",
  measurementId: "G-JSBBYPM10Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
