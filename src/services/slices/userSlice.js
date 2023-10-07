import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginURL, registerURL, logoutURL, tokenURL, request} from '../../utils/api.js';

import Cookies from 'js-cookie';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: '',
            email: '',
        },
        registration: {
            name: '',
            email: '',
            password: ''
        },
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null
    },
    reducers: {
        updateRegistration: (state, action) => {
            const { field, value } = action.payload;
            state.registration[field] = value;
            },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            const ingredients = action.payload;
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            Cookies.set('accessToken', action.payload.accessToken);
            Cookies.set('refreshToken', action.payload.refreshToken);
          })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        Cookies.set('accessToken', action.payload.accessToken);
        Cookies.set('refreshToken', action.payload.refreshToken);

        console.log(action.payload)
        })
        .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log(state.error)
        })

        .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
        // Clear tokens from local storage or cookies
        // Remove axios default headers for authorization
        // Handle redirection to / after successful logout
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        state.loading = false;
        state.error = null;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        })
        .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

        .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(refreshAccessToken.fulfilled, (state, action) => {
        // Update the accessToken in local storage or cookies
        // Update axios default headers for authorization with newAccessToken
        Cookies.set('accessToken', action.payload);

        state.loading = false;
        state.error = null;
        state.accessToken = action.payload;
        })
        .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        });
    }

})

export const {updateRegistration} = userSlice.actions;


export const login = createAsyncThunk('user/login',
async ({email, password}) => {
    try {
        const response = await request(loginURL, 'POST', {email, password});
        const {user, accessToken, refreshToken} = response.data

        return {user, accessToken, refreshToken};
    } catch (error) {
        throw new Error(error.message)
    }
});

export const register = createAsyncThunk('user/register', async ({ email, password, name }) => {
    try {
      const response = await request(registerURL, {
        method: 'POST', 
        header: {'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name })
    });
      const { user, accessToken, refreshToken } = response.data;
      // Store tokens in local storage or cookies
      // Also, set axios default headers for authorization with accessToken
      // Handle redirection to / after successful registration
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  });


export const logout = createAsyncThunk('user/logout', async (refreshToken) => {
    try {
      await request(logoutURL, 'POST', { token: refreshToken });
      // Clear tokens from local storage or cookies
      // Remove axios default headers for authorization
      // Handle redirection to / after successful logout
    } catch (error) {
      throw new Error(error.message);
    }
  });

export const refreshAccessToken = createAsyncThunk('user/refreshAccessToken', async (refreshToken) => {
    try {
      const response = await request(tokenURL, 'POST', { token: refreshToken });
      const newAccessToken = response.data.accessToken;
      // Update the accessToken in local storage or cookies
      // Update axios default headers for authorization with newAccessToken
      return newAccessToken;
    } catch (error) {
      throw new Error(error.message);
    }
  });