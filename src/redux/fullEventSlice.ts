import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFullEventById } from "../utils/fullEventsClient";
import {
	FullEventReducer,
	StoreState,
} from "./stateTypes";
import { EventTypeStatus, Status } from "./types";

const initialState: FullEventReducer = {
	error: {
		code: "",
		message: "",
	},
	fullEvent: {
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
		areIndependent: true,
		dates: [""],
		time: "",
		tags: [""],
		venueName: "",
		venueDescription: "",
		venueFacebook: "",
		venueInstagram: "",
		venueTwitter: "",
		venueWebsite: "",
		address: "",
		locationCoordinates: [],
		locationType: "",
	},
	eventStatus: Status.IDLE,
};

export const fetchFullEventById = createAsyncThunk(
	"event/fetchFullEventById",
	async (eventId: string) => {
		return await getFullEventById(eventId);
	}
);

export const fullEventSlice = createSlice({
	name: "fullEvent",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFullEventById.pending, (state) => {
			state.eventStatus = Status.LOADING;
		});
		builder.addCase(fetchFullEventById.fulfilled, (state, action) => {
			state.eventStatus = Status.SUCCEEDED;
			state.fullEvent = action.payload;
		});
		builder.addCase(fetchFullEventById.rejected, (state) => {
			state.eventStatus = Status.FAILED;
		});
	},
});

export const singleFullEvent = ({ fullEvent }: StoreState): FullEventReducer =>
	fullEvent;
export default fullEventSlice.reducer;
