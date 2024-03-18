  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: {},
  };

  const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
      loginRequested(state) {
        state.isLoading = true;
        state.isLoggedIn = false
      },
      loginSuccessful(state, action) {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      loginError(state) {
        state.isLoading = false;
        state.isLoading = false;
        state.user = {};
      },
      logout(state) {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = {};
      },
    },
  });

  export const { loginRequested, loginSuccessful, loginError, logout } = userSlice.actions;
  export default userSlice.reducer;
