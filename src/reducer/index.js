import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "../slices/authSlice";
import  cartReducer  from "../slices/cartSlice";
import profileReducer from '../slices/profileSlice';
import courseReducer from '../slices/courseSlice';
export const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    course:courseReducer
})  