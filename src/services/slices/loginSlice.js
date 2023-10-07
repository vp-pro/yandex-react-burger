import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginURL, request } from "../../utils/api.js";
import Cookies from "js-cookie";
import { updateUser } from "./userSlice"; // Import the updateUser action
import { authenticate } from "./authSlice.js";

const initialState = {
    user: { 
      email: '',
      password: '',
    },
    loading: false,
    error: null,
  };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLoginUser: (state, action) => {
        const { field, value } = action.payload;
        state.user[field] = value;
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = { 
            email: '',
            password: '',
          }      
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateLoginUser } = loginSlice.actions;


export const login = createAsyncThunk(
    "login/login",
    async ({ email, password }, { dispatch }) => {
      try {
        const response = await request(loginURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ email, password }),
        });
  
        const { user, accessToken, refreshToken } = response;
        dispatch(updateUser(user));
  
        dispatch(authenticate({accessToken, refreshToken}));


  
        return { user, accessToken, refreshToken };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  
  export default loginSlice.reducer;