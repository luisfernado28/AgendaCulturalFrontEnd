/*
 * File: userSlice.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById, patchtUser } from "../utils/authClient";
import { StoreState, UserReducer } from "./stateTypes";
import { Status, UserUpdateData } from "./types";

const initialState: UserReducer = {
	error: {
		code: "",
		message: "",
	},
	user: {
		id: "",
		username: "",
		firstname: "",
		lastname: "",
		password: "",
		admin: false,
	},
	userStatus: Status.IDLE,
};

export const fetchUserById = createAsyncThunk(
	"auth/fetchById",
	async (userId: string) => {
		return await getUserById(userId);
	}
);

export const modifyUser = createAsyncThunk(
	"auth/updateUser",
	async (data: UserUpdateData) => {
		return await patchtUser(data);
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserById.pending, (state) => {
			state.userStatus = Status.LOADING;
		});
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.userStatus = Status.SUCCEEDED;
			state.user = action.payload;
		});
		builder.addCase(fetchUserById.rejected, (state) => {
			state.userStatus = Status.FAILED;
		});
	},
});

export const singleUser = ({ user }: StoreState): UserReducer => user;
export default userSlice.reducer;
