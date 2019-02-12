import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB52QX4VrHxo46qc05y2eXzvzaSrkTxrhk",
  authDomain: "fta-api-f15e0.firebaseapp.com",
  databaseURL: "https://fta-api-f15e0.firebaseio.com",
  projectId: "fta-api-f15e0",
  storageBucket: "fta-api-f15e0.appspot.com",
  messagingSenderId: "1002345388837"
});

export default firebaseApp;
