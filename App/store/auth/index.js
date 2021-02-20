import { createAction, createReducer } from "@reduxjs/toolkit";

  const INITIAL_STATE = {
   islogged: false
  };
  
export const islogged = createAction("AUTH/ISLOG_IN");

  
export default createReducer(INITIAL_STATE, {
    [islogged]: (state, action) => ({
      ...state,
      islogged: action.payload,
        
    }),
      
});

export const authSelector = (state) => state.authstate;
