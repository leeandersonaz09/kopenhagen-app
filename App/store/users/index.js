import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

  export const addUser = createAction("USERS/ADD_USER");
  
  const INITIAL_STATE = {
    userData: {},
  };
  
  export const addItem = createAction("USERS/ADD_USER");

  export default createReducer(INITIAL_STATE, {
    [addUser]: (state, action) => ({
      ...state,
      
    }),
    
  });

  

  
  export const usersDataSelector = (state) => state.users.userData;