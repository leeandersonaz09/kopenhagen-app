import { createAction, createReducer } from "@reduxjs/toolkit";

  const INITIAL_STATE = {
   
  };
  
export const islogged = createAction("AUTH/ISLOG_IN");

  
export default createReducer(INITIAL_STATE, {
    
});

export const authSelector = (state) => state.authstate;
