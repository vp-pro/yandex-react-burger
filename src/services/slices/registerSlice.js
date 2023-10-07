import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginURL, registerURL, logoutURL, tokenURL, request} from '../../utils/api.js';
import { updateUser } from "./userSlice"; // Import the updateUser action
import {authenticate} from "./authSlice.js"
import Cookies from 'js-cookie';

const initialState = {
    user: {
        name: '',
        email: '',
        password: ''
    },
    loading: false,
    error: null
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        updateRegisterUser: (state, action) => {
            const { field, value } = action.payload;
            state.user[field] = value;
            },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
            name: '',
            email: '',
            password: ''
        }

        })
        .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log(state.error)
        })

    }

})

export const {updateRegisterUser} = registerSlice.actions;

export const register = createAsyncThunk("register/register", async ({ email, password, name }, { dispatch }) => {
    try {
      const response = await request(registerURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ email, password, name }),
      });
  
      console.log(response)
      const { user, accessToken, refreshToken } = response;
  

      dispatch(updateUser(user));
      dispatch(authenticate(accessToken, refreshToken));

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  });
