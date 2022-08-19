/*
 * File: usersSlice.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteUser,
	getCountUsers,
	getUsers,
	postUser,
} from "../utils/authClient";

import { StoreState, UsersReducer } from "./stateTypes";
import { CreateUser, QueryParams, Status } from "./types";

const initialState: UsersReducer = {
	error: {
		code: "",
		message: "",
	},
	users: [],
	hasMore: true,
	status: Status.IDLE,
	count: 0,
};

export const fetchUsers = createAsyncThunk(
	"auth/fetchUsers",
	async (queryParams?: QueryParams) => {
		return await getUsers(queryParams);
	}
);

export const countUsers = createAsyncThunk(
	"auth/countUsers",
	async (queryParams?: QueryParams) => {
		return await getCountUsers(queryParams);
	}
);

export const createUser = createAsyncThunk(
	"auth/postUser",
	async (body: CreateUser) => {
		return await postUser(body);
	}
);

export const removeUser = createAsyncThunk(
	"auth/deleteUser",
	async (data: string) => {
		return await deleteUser(data);
	}
);

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.status = Status.SUCCEEDED;
			state.users = action.payload;
		});
		builder.addCase(fetchUsers.rejected, (state) => {
			state.status = Status.FAILED;
		});
		builder.addCase(countUsers.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(countUsers.fulfilled, (state, action) => {
			state.status = Status.SUCCEEDED;
			state.count = action.payload;
		});
		builder.addCase(countUsers.rejected, (state) => {
			state.status = Status.FAILED;
		});
		builder.addCase(createUser.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(createUser.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.users.push(payload);
		});
		builder.addCase(createUser.rejected, (state, action) => {
			state.status = Status.FAILED;
			state.error.message = "Internal Server error";
			state.error.code = "400";
		});
	},
});

export const selectAllUsers = ({ users }: StoreState): UsersReducer => users;
export default usersSlice.reducer;
