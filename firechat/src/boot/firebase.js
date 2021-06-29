import { boot } from 'quasar/wrappers'

// console.log("todo bieeen");
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyB7i3KjXoY6ublWN7UIroTa8Bt3FpFEXZk",
  authDomain: "fire-chat-quasar.firebaseapp.com",
  projectId: "fire-chat-quasar",
  storageBucket: "fire-chat-quasar.appspot.com",
  messagingSenderId: "866927374653",
  appId: "1:866927374653:web:b9dfa2c3553b5d64ae9554"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcaTiempo}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
