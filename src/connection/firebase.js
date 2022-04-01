import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {

  apiKey: "AIzaSyCmw1ykYTUSUmVsH3Lzvqtvbb8LevJ-OIc",
  authDomain: "tarefas-1e70c.firebaseapp.com",
  projectId: "tarefas-1e70c",
  storageBucket: "tarefas-1e70c.appspot.com",
  messagingSenderId: "647726995051",
  appId: "1:647726995051:web:eb839529ec6cd71e3a032e",
  measurementId: "G-S6GQMM4S61"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
