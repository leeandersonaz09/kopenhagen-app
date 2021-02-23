import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

  const INITIAL_STATE = {
    userData: {},
  };
  
  export const addUser = createAction("USERS/ADD_USER");

  export default createReducer(INITIAL_STATE, {
    [addUser]: (state, action) => [...state, action.payload]
    
  });

  

  
  export const usersDataSelector = (state) => state.users.userData;