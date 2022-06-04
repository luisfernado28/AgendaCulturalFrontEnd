import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteFullEvent,
	getCountFullEvents,
	getFullEvents,
	postFullEvent,
	putFullEvent,
} from "../utils/fullEventsClient";
import { FullEventsReducer, StoreState } from "./stateTypes";
import { CreateFullEvents, FullEventUpdateData, QueryParams, Status } from "./types";

const initialState: FullEventsReducer = {
	fullEvents: [],
	error: {
		code: "",
		message: "",
	},
	hasMore: true,
	status: Status.IDLE,
	count: 0
};

export const fetchFullEvents = createAsyncThunk(
	"events/fetchFullEvents",
	async (queryParams?: QueryParams) => {
		return await getFullEvents(queryParams);
	}
);

export const countFullEvents = createAsyncThunk(
	"auth/countFullEvents",
	async (queryParams?: QueryParams) => {
		return await getCountFullEvents(queryParams);
	}
);

export const createFullEvent = createAsyncThunk(
	"events/postFullEvents",
	async (body: CreateFullEvents) => {
		return await postFullEvent(body);
	}
);

export const removeFullEvent = createAsyncThunk(
	"events/deleteFullEvent",
	async (data: string) => {
		return await deleteFullEvent(data);
	}
);

export const modifyFullEvent = createAsyncThunk(
	"events/updateFullEvent",
	async (data: FullEventUpdateData) => {
		return await putFullEvent(data);
	}
);

export const fullEventsSlice = createSlice({
	name: "fullEvents",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFullEvents.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchFullEvents.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.hasMore = true;
			state.fullEvents = payload;
		});
		builder.addCase(fetchFullEvents.rejected, (state) => {
			state.status = Status.FAILED;
		});
		builder.addCase(createFullEvent.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.fullEvents.push(payload);
		});
		builder.addCase(countFullEvents.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(countFullEvents.fulfilled, (state, action) => {
			state.status = Status.SUCCEEDED;
			state.count = action.payload;
		});
		builder.addCase(countFullEvents.rejected, (state) => {
			state.status = Status.FAILED;
		});
	},
});

export const selectAllFullEvents = ({
	fullEvents,
}: StoreState): FullEventsReducer => fullEvents;
export default fullEventsSlice.reducer;
