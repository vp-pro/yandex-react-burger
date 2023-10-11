import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {url, request, requestWithRefresh} from '../../utils/api'
import {useNavigate} from 'react-router-dom'
import { clearOrder } from "./orderSlice";
import { useDispatch } from "react-redux";
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



export const logout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  const token = localStorage.getItem("refreshToken");
  try {
    await request(url.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    dispatch(clearOrder());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    const navigate = useNavigate();
    navigate("/login");
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
      console.log(url.doResetPassword)
      const response = await request(
        url.doResetPassword,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: newPass,
            token: emailCode,
          }),
        }
      );
      console.log(response)

    } catch (error) {
      console.error('An error occurred:', error);
      console.error('An error occurred:', error.message);

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

export const getUser = createAsyncThunk("user/getUser", async () => {
    try {
      const response = await requestWithRefresh(url.user, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8",
          "Authorization": localStorage.getItem('refreshToken') },
      });
  
      return response.user;
    } catch (error) {
      throw new Error(error.message);
    }
  });


  export const patchUser = createAsyncThunk("user/pathUser", async ({ name, email, password }, { dispatch }) => {
    try {
      const response = await requestWithRefresh(url.user, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log(response);

      dispatch(setUser(response.user));
      return response.user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
  
