
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

  const getDataExplorer = (category, limit, onUpdate) => {

    firebase.firestore()
      .collection('Produtos')
      .where("category", "==", category)
      .orderBy('data', 'desc')
      .limit(limit)
      .onSnapshot(onUpdate);

  }
  const getmoreDataExplorer = (category, limit, lastVisible, onUpdate) => {

    firebase.firestore()
      .collection('Produtos')
      .where("category", "==", category)
      .orderBy('data', 'desc')
      .startAfter(lastVisible.data().data)
      .limit(limit)
      .onSnapshot(onUpdate);

  }

  const getMyrequest = (onUpdate) => {

    firebase.firestore()
      .collection('Pedidos')
      .where("userId", "==", authUser.uid)
      .orderBy('data', 'desc')
      .onSnapshot(onUpdate);
  }

  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore()
      .collection('users')
      .doc(documentPath)
      .onSnapshot(onUpdate);
  }

  const getDocumentFrete = (documentPath, onUpdate) => {
    firebase.firestore()
      .collection('Frete')
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
      .doc(documentPath)
      .set(document);
  }
  const login = useCallback((email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password), []);

  const logout = useCallback(() => firebase.auth().signOut(), [])

  return { login, authUser, logout, getDocumentFrete, getDocument, saveDocument, saveDocumentPedidos, getMyrequest, getDataExplorer, getmoreDataExplorer }
}

export { useFirebase }

export default firebaseConfig;
