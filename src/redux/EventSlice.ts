import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEventById } from "../utils/eventsClient";
import {
	EventReducer,
	StoreState,
} from "./stateTypes";
import {Status } from "./types";

const initialState: EventReducer = {
	error: {
		code: "",
		message: "",
	},
	Event: {
		title: "",
		artist: "",
		venueId: "",
		status: 0,
		price: 0,
		id: "",
		phone: "",
		type: "0",
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

export const fetchEventById = createAsyncThunk(
	"event/fetchEventById",
	async (eventId: string) => {
		return await getEventById(eventId);
	}
);

export const EventSlice = createSlice({
	name: "Event",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchEventById.pending, (state) => {
			state.eventStatus = Status.LOADING;
		});
		builder.addCase(fetchEventById.fulfilled, (state, action) => {
			state.eventStatus = Status.SUCCEEDED;
			state.Event = action.payload;
		});
		builder.addCase(fetchEventById.rejected, (state) => {
			state.eventStatus = Status.FAILED;
		});
	},
});

export const singleEvent = ({ Event }: StoreState): EventReducer =>
	Event;
export default EventSlice.reducer;
