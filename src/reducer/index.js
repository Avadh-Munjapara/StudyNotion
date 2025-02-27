import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "../slices/authSlice";
import  cartReducer  from "../slices/cartSlice";
export const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer
})