import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import cartReducer from '../slices/cartSlice'

const combinedReducers = combineReducers({
    auth: userReducer,
    cart: cartReducer
})

export default combinedReducers;