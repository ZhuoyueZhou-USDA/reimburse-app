import firebase from 'firebase/app';
import 'firebase/firestore' 
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSIQsk5CoLwe80zbmV-V3a6VZZoJhH0HM",
    authDomain: "reimburse-webapp.firebaseapp.com",
    databaseURL: "https://reimburse-webapp.firebaseio.com",
    projectId: "reimburse-webapp",
    storageBucket: "",
    messagingSenderId: "803176680064"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true})
  export default firebase;