// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  accessToken: null,
  userName:null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userName = action.payload.user; // or user object depending on your reducer
      state.userId = action.payload.userId; // Assuming userId is part of the payload
    },
    logOut: (state) => {
      state.accessToken = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
