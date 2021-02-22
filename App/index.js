import React from "react";
import Navigation from "./config/navigation";
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from './store';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";
import firebaseConfig from './config/firebase';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
firebase.firestore();

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
            <FlashMessage position="top" />
        </Provider>
    )
};