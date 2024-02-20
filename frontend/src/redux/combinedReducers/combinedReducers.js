import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';

const combinedReducers = combineReducers({
    auth: userReducer,
    cart: cartReducer,
    modal: modalReducer
})

export default combinedReducers;