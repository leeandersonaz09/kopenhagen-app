import React from "react";
import Navigation from "./config/navigation";
import FlashMessage from 'react-native-flash-message';

import { Provider } from 'react-redux';
import store from './store';

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
            <FlashMessage position="top" />
        </Provider>
    )
};