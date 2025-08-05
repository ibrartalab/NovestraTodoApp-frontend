// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  accessToken: null,
  userName:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken,userName } = action.payload;
      state.accessToken = accessToken;
      state.userName = userName;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.userName = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
