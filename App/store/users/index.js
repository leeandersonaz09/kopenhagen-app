import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

  export const addUser = createAction("USERS/ADD_USER");
  
  const INITIAL_STATE = {
    userData: [],
  };
  
  export default createReducer(INITIAL_STATE, {
    [addUser]: (state, action) => ({
      ...state,
      userData: verifyExistUser(state, action),
    }),
    
  });

  function verifyExistUser(state, action) {
    const newUser = action.payload;
  
    const existUser = state.userData.some((item) => userData.uid === newUser.uid);
  
    if (existUser) {
      return state.userData.map((item) => {
        return userData.uid === newUser.uid
          ? { ...userData, userState: newUser.userState}
          : userData;
      });
    }
  
    return [...state.userState, newUser];
  }

  
  export const usersDataSelector = (state) => state.users.userData;