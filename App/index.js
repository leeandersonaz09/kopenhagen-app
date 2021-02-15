import React from "react";
import Navigation from "./config/navigation";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ProductsReducers from "./Store/Reducers/ProductsReducers";
import CartReducers from "./Store/Reducers/CartReducers";

const RootReducer = combineReducers({
    products: ProductsReducers,
    cartItems: CartReducers,
    itemsCount: CartReducers,
    wishListItems: CartReducers

});

const store = createStore(RootReducer);

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
};