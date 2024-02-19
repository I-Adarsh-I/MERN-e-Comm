import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./combinedReducers/combinedReducers";
import persistConfig from "./persistConfig";
import {persistReducer, persistStore} from 'redux-persist'

const persistedReducer = persistReducer(persistConfig, combinedReducers)
const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);
export default store;