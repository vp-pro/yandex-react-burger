import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, request } from '../../utils/api.js';
import Cookies from 'js-cookie';

const initialState = {
  isAuthChecked: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action)=> {
        console.log(action)
        state.isAuthenticated = true;

        const { accessToken, refreshToken } = action.payload;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
    },
    clearAuthData: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
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
        const newAccessToken = action.payload;
        Cookies.set('accessToken', newAccessToken, { domain: 'react.panferov.site', path: '/', secure: true });
        state.loading = false;
        state.error = null;
        state.accessToken = newAccessToken;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthenticated, setTokens, clearAuthData, authenticate } = authSlice.actions;

export const logout = createAsyncThunk('auth/logout', async (refreshToken, { dispatch }) => {
    try {
      await request(url.logout, 'POST', { token: refreshToken });
  
      dispatch(clearAuthData());
    } catch (error) {
      throw new Error(error.message);
    }
  });
  
  export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (refreshToken, { dispatch }) => {
      try {
        const response = await request(url.token, 'POST', { token: refreshToken });
        const newAccessToken = response.data.accessToken;
  
        dispatch(setTokens({ accessToken: newAccessToken, refreshToken }));
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  