import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cart from "./cart";
import users from "./users";

export default configureStore({
  reducer: {
    cart,
    users,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});