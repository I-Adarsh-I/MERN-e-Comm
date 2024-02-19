import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    quantity: 0 // Initial quantity for the entire cart
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addItem(state, action){
          const itemToAdd = action.payload;
          const existingItem = state.items.find(item => item._id === itemToAdd._id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.items.push(action.payload);
          }
        },
        removeItem(state, action){ 
          const { id } = action.payload
          state.items =  state.items.filter(item => item._id !== id)
        },
        decreaseItemQuantity(state, action) {
          const { id } = action.payload;
          const itemIndex = state.items.findIndex(item => item._id === id);
          if (itemIndex !== -1 && state.items[itemIndex].quantity > 0) {
              state.items[itemIndex].quantity -= 1;
          }
      },
        updateItemQuantity(state, action) {
            const { id } = action.payload;
            const itemToUpdate = state.items.find(item => item._id === id);
            if (itemToUpdate) {
              itemToUpdate.quantity += 1;
            }
          },
          clearCart(state) {
            state.items = [];
          },
    }
})

export const { addItem, removeItem, updateItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
