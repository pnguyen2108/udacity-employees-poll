import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ILogin } from "../models/auth.model";
import type { IUser } from "../models/users.model";
import { setLogin } from "../../_DATA";

export type AuthState = {
  isAuthenticated: boolean,
  userData?: any,
  isLoading: boolean,
};

export const authInitialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  isLoading: false
};

export const authLogin = createAsyncThunk(
  "auth/Login",
  async (loginData: ILogin) => {
    return await setLogin(loginData.username, loginData.password);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state: AuthState) => {

      return {
        ...state,
        isAuthenticated: false,
        userData: null
      };
    },
    setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload
    })
  },
  selectors: {
    getUserInformation: (authState) => authState.userData,
    getAuthenticated: (authState) => authState.isAuthenticated,
    getIsLoading: (authState) => authState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAuthenticated = true;

        state.userData = action.payload;

        state.isLoading = false;

      })
      .addCase(authLogin.rejected, (state) => {

        state.isLoading = false;
      });
  }
});

export const { logout } = authSlice.actions;