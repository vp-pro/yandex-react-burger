import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  url,
  request,
  requestWithRefresh,
} from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { clearOrder } from "./orderSlice";

interface IUser {
  name: string | null,
  email: string | null
}

const initialState = {
  user: null as IUser | null,
  isAuthChecked: null as boolean | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
      .addCase(logout.rejected, () =>{
        const navigate = useNavigate();
        navigate("/login");
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.error('Registration rejected:', action.error); // Access the error property
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });

  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("refreshToken");
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

  }
);



export const login = createAsyncThunk(
  "user/login",
  async ({email, password} : { email:string, password:string }, thunkAPI) => {
    // try {
      const response = await request(url.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ email, password }),
      });
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        return response.user;
      // } catch (error: any) {
      //   return thunkAPI.rejectWithValue(error.message);
      // }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({email, password, name} : { email: string, password:string, name:string}, thunkAPI) => {
  // try {
    const response = await request(url.register, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ email, password, name }),
    });

    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    return response.user;
  // } catch (error: any) {
  //   return thunkAPI.rejectWithValue(error.message);
  // }
});


export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({newPass, emailCode} : { newPass:string, emailCode:string}) => {
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
      console.log(response?.success)
  }
);


export const checkUserAuth = () => {
  return (dispatch: any) => {
      if (localStorage.getItem("accessToken") && localStorage.getItem('refreshToken')) {
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

export const getUser = createAsyncThunk(
  "user/getUser", async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset=utf-8");
    headers.append("Authorization", localStorage.getItem("accessToken") || '');

    const response = await requestWithRefresh(url.user, {
      method: "GET",
      headers: headers,
    });

    return response.user;
});


  export const patchUser = createAsyncThunk("user/pathUser",
  async ({name, email, password} : { name:string, email:string, password:string }, { dispatch }) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json; charset=utf-8");
      headers.append("Authorization", localStorage.getItem("accessToken") || '');


      const response = await requestWithRefresh(url.user, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ name, email, password }),
      });

      dispatch(setUser(response.user));
      return response.user;
  });

