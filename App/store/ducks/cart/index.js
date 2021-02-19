import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [

]

export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');

export default createReducer(INITIAL_STATE, {
	[addItem.type]: (state, action) => [ ...state, action.payload ],
	[removeItem.type]: (state, action) => state.filter((item) => item.id !== action.payload),
	
});

/* 
https://www.youtube.com/watch?v=pMLq5JQJLpQ&list=PLK5FPzMuRKlyILd8Jh08M6a1-htpHYzwv&index=16
https://www.youtube.com/watch?v=3GpRg-PdbEU
https://stackoverflow.com/questions/51626700/in-react-redux-how-to-calculate-a-total-price-for-a-shopping-cart/51627152

*/