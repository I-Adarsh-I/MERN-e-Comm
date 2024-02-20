import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalOpenReq(state){
            state.isOpen = true
        },
        modalCloseReq(state){
            state.isOpen = false
        }
    }
})

export const { modalOpenReq, modalCloseReq} = modalSlice.actions;
export default modalSlice.reducer; 