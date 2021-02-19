"use strict";
import React from "react";
import Navigation from "./config/navigation";
import FlashMessage from 'react-native-flash-message';

import reducers from './reducers';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
//import store from './store';

// store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
            <FlashMessage position="top" />
        </Provider>
    )
};