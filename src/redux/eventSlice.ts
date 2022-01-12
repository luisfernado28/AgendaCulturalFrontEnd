import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEventById, putEvent } from "../utils/client";

import { StoreState, EventReducer } from "./stateTypes";
import { EventTypeStatus, EventUpdateData, Status } from "./types";

const initialState: EventReducer = {
	error: {
		code: "",
		message: "",
	},
	event: {
		title: "",
		artist: "",
		venueId: "",
		status: 0,
		price: 0,
		id: "",
		phone: "",
		type: EventTypeStatus.HYBRID,
		description: "",
		website: "",
		facebook: "",
		twitter: "",
		instagram: "",
		imageUrl: "",
		dates: {
			areindependent: true,
			dates: [""],
			time: "",
		},
		tagsId: [""],
		time: "",
	},
	eventStatus: Status.IDLE,
};

export const fetchEventById = createAsyncThunk(
	"event/fetchById",
	async (eventId: string) => {
		return await getEventById(eventId);
	}
);

export const modifyEvent = createAsyncThunk(
	"events/updateEvent",
	async (data: EventUpdateData) => {
		return await putEvent(data);
	}
);

export const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchEventById.pending, (state) => {
			state.eventStatus = Status.LOADING;
		});
		builder.addCase(fetchEventById.fulfilled, (state, action) => {
			state.eventStatus = Status.SUCCEEDED;
			state.event = action.payload;
		});
		builder.addCase(fetchEventById.rejected, (state) => {
			state.eventStatus = Status.FAILED;
		});
	},
});

export const singleEvent = ({ event }: StoreState): EventReducer => event;
export default eventSlice.reducer;
