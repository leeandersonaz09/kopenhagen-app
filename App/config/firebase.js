
import { useEffect, useState, useCallback } from 'react';
import * as firebase from 'firebase';

import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

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
// firebase.initializeApp(firebaseConfig);
const useFirebase = () => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);


  useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => setAuthUser(user))
    return () => {
      unsubscribe()
    };

  }, []);

  const getUsetData = ()=>{

    let dataf = [];

    firebase.firestore()
      .collection("users")
      .doc(authUser.uid)
      .get()
      .then(doc => {
        dataf = doc.data()
      });

      return dataf
  }

  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore()
    .collection('users')
      .doc(documentPath)
      .onSnapshot(onUpdate);
  }

  const saveDocument = (documentPath, document) => {
    firebase.firestore()
    .collection('users')
      .doc(documentPath)
      .update(document);
  }

  const saveDocumentPedidos = (documentPath, document) => {
    firebase.firestore()
    .collection('Pedidos')
      .doc(authUser.uid)
      .collection('cart')
      .doc(documentPath)
      .set(document);
  }
  const login = useCallback((email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password), []);

  const logout = useCallback(() => firebase.auth().signOut(), [])

  return { login, authUser, logout, getDocument, saveDocument, saveDocumentPedidos }
}

export { useFirebase }

export default firebaseConfig;
