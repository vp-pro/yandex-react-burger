import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {url, request} from '../../utils/api'
import {useNavigate} from 'react-router-dom'
const initialState = {
  user: null,
  isAuthChecked: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) =>{
      state.user = action.payload
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  },
});

export const {setAuthChecked, setUser} = userSlice.actions;



export const logout = createAsyncThunk('user/logout', 
async () => {
  try {
    await request(url.logout, {
      method:'POST', 
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }), // Corrected here
    });

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

  } catch (error) {
    const navigate = useNavigate(); 
    navigate('/'); 
    throw new Error(error.message);
  } 
});


export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await request(url.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ email, password }),
      });
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const register = createAsyncThunk("user/register", async ({ email, password, name }, { dispatch }) => {
  try {
    const response = await request(url.register, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ email, password, name }),
    });

    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;
  } catch (error) {
    throw new Error(error.message);
  }
});


export const resetPassword = createAsyncThunk('user/resetPassword',async ({ newPass, emailCode }) => {
    try {
      const response = await request(
        url.doResetPassword,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPass,
            emailCode,
          }),
        }
      );

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(error.message);
    }
  }
);


export const checkUserAuth = () => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser(null));
              })
              .finally(() => dispatch(setAuthChecked()));
      } else {
          dispatch(setAuthChecked());
      }
  };
};

export const getUser = createAsyncThunk("user/user", async () => {
    try {
      const response = await request(url.user, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8",
          "Authorization": localStorage.getItem('refreshToken') },
      });
  
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  });



