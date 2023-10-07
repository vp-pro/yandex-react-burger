import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: '',
    email: '',
  },
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
  extraReducers: (builder) => {
  },
});

export const { updateUser } = userSlice.actions;