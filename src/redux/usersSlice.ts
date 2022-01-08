import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers, postUser } from "../utils/authClient";

import { StoreState, UsersReducer } from "./stateTypes";
import { CreateUser, Status } from "./types";

const initialState: UsersReducer = {
	error: {
		code: "",
		message: "",
	},
	users: [],
	hasMore: true,
	status: Status.IDLE,
};

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
	return await getUsers();
});

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
	name: "venues",
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
