import * as firebase from "firebase";

// import { FirebaseConfig } from "../config/keys";
firebase.initializeApp({
  apiKey: "AIzaSyC5rk77FDkvtBRGAWBP83eJt4J_D1tdmLw",
  authDomain: "carpool-open.firebaseapp.com",
  databaseURL: "https://carpool-open.firebaseio.com",
  projectId: "carpool-open",
  storageBucket: "carpool-open.appspot.com",
  messagingSenderId: "715226511432"
});

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
