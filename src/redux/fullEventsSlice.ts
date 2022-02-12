import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFullEvents } from "../utils/fullEventsClient";
import { FullEventsReducer, StoreState } from "./stateTypes";
import { QueryParams, Status } from "./types";

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
	},
});

export const selectAllFullEvents = ({
	fullEvents,
}: StoreState): FullEventsReducer => fullEvents;
export default fullEventsSlice.reducer;
