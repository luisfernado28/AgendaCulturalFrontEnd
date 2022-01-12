import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAuth } from "../utils/authClient";
import { Authentication, StoreState, userInfo } from "./stateTypes";
import { Status, UserCredentials } from "./types";

const emptyUserData: userInfo = {
	id: "",
	username: "",
	firstname: "",
	lastname: "",
	admin: false,
	token: "",
};

const initialState: Authentication = {
	userInfo: emptyUserData,
	loggedIn: false,
	requestError: "",
	requestErrorCode: undefined,
	requestStatus: Status.IDLE,
};

export const authUser = createAsyncThunk(
	"auth/logUser",
	async (body: UserCredentials) => {
		return await postAuth(body);
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		LogOut(state) {
			state.loggedIn = false;
			state.userInfo = emptyUserData;
			state.requestError = "";
			state.requestErrorCode = undefined;
			state.requestStatus = Status.IDLE;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authUser.pending, (state) => {
			state.requestStatus = Status.LOADING;
		});
		builder.addCase(authUser.fulfilled, (state, { payload }) => {
			state.requestStatus = Status.SUCCEEDED;

			if (payload.status === 200) {
				const { token, id, username, firstname, lastname, admin } =
					payload.user;
				state.userInfo = {
					token,
					id,
					username,
					firstname,
					lastname,
					admin,
				};
				state.loggedIn = true;
				state.requestError = "";
				state.requestErrorCode = 200;
			} else if (payload?.status === 401) {
				state.requestError = "Wrong username or password";
				state.requestErrorCode = payload.status;
				state.loggedIn = false;
				state.userInfo = emptyUserData;
			} else {
				state.requestError = "Internal server error";
				state.requestErrorCode = payload?.status;
				state.loggedIn = false;
				state.userInfo = emptyUserData;
			}
		});
		builder.addCase(authUser.rejected, (state) => {
			state.requestStatus = Status.FAILED;
			state.requestError = "Internal Server Error";
			state.requestErrorCode = undefined;
		});
	},
});

export const { LogOut } = authSlice.actions;
export const authUsers = ({ auth }: StoreState): Authentication => auth;
export default authSlice.reducer;
