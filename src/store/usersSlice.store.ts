import type { IUser } from "../models/users.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getAllUsers, _getUserDetail } from "../../_DATA";

export type UsersState = {
  loadingUserDetail: boolean;
  loadingUsers: boolean;
  users: IUser[]
  userDetail: IUser | null
};

export const userInitialState: UsersState = {
  loadingUserDetail: false,
  loadingUsers: false,
  users: [],
  userDetail: null
};

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async () => {
    return await _getAllUsers();
  }
);

export const fetchUserDetail = createAsyncThunk(
  "auth/fetchUserDetail",
  async (userId: string) => {
    return await _getUserDetail(userId);
  }
);


export const usersSlice = createSlice({
  name: "users",
  initialState: userInitialState,
  reducers: {},
  selectors: {
    getUsers: (state) => {
      return state.users;
    }

  },
  extraReducers: (builder) => {
    // fetch all user
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.loadingUsers = true;
      })
      .addCase(fetchUsers.fulfilled, (state: UsersState, action: any) => {
        state.users = Object.values(action.payload);
        state.loadingUsers = false;
      })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.loadingUsers = false;
      });
    // fetch user detail
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loadingUserDetail = true;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action: any) => {
        state.userDetail = action.payload;

        state.loadingUserDetail = false;
      })
      .addCase(fetchUserDetail.rejected, (state) => {
        state.loadingUserDetail = false;
      });
  }
});

export const { getUsers } = usersSlice.selectors;