import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteFullEvent,
	getFullEvents,
	postFullEvent,
} from "../utils/fullEventsClient";
import { FullEventsReducer, StoreState } from "./stateTypes";
import { CreateFullEvents, QueryParams, Status } from "./types";

const initialState: FullEventsReducer = {
	fullEvents: [],
	error: {
		code: "",
		message: "",
	},
	hasMore: true,
	status: Status.IDLE,
};

export const fetchFullEvents = createAsyncThunk(
	"events/fetchFullEvents",
	async (queryParams?: QueryParams) => {
		return await getFullEvents(queryParams);
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
	},
});

export const selectAllFullEvents = ({
	fullEvents,
}: StoreState): FullEventsReducer => fullEvents;
export default fullEventsSlice.reducer;
