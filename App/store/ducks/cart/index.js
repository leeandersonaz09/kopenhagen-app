import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [

]

export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');

export default createReducer(INITIAL_STATE, {
	[addItem.type]: (state, action) => [ ...state, action.payload ],
	[removeItem.type]: (state, action) => state.filter((item) => item.data.id !== action.payload),
	addItem: (state, action) => {
		return {
			...state,
			items: [...state.items, {/*NOVO ITEM COM A action.item */}],
			total: state.items.replace((subtotal, item) => subtotal + item.price, 0)
		}
	}
});

/* 
https://www.youtube.com/watch?v=pMLq5JQJLpQ&list=PLK5FPzMuRKlyILd8Jh08M6a1-htpHYzwv&index=16
https://www.youtube.com/watch?v=3GpRg-PdbEU
https://stackoverflow.com/questions/51626700/in-react-redux-how-to-calculate-a-total-price-for-a-shopping-cart/51627152
https://github.com/egaleme/react-native-shop/blob/master/app/components/CartItems.component.js
https://www.youtube.com/watch?v=J7Tw1hlK41E

this is ok

https://github.com/steelx/shoppingcart/blob/master/src/components/cart.js
https://www.youtube.com/watch?v=J7Tw1hlK41E&list=PLq5m66kIJ5Z9RX29udAzvG7LPC_yOzKDc



https://codeburst.io/e-commerce-mobile-shop-with-react-native-and-redux-623e829db967
*/