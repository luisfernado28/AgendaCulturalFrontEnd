/*
 * File: EventsSlice.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	deleteEvent,
	getCountEvents,
	getEvents,
	postEvent,
	putEvent,
} from "../utils/eventsClient";
import { EventsReducer, StoreState } from "./stateTypes";
import { CreateEvents, EventUpdateData, QueryParams, Status } from "./types";

const initialState: EventsReducer = {
	Events: [],
	error: {
		code: "",
		message: "",
	},
	hasMore: true,
	status: Status.IDLE,
	count: 0
};

export const fetchEvents = createAsyncThunk(
	"events/fetchEvents",
	async (queryParams?: QueryParams) => {
		return await getEvents(queryParams);
	}
);

export const countEvents = createAsyncThunk(
	"auth/countEvents",
	async (queryParams?: QueryParams) => {
		return await getCountEvents(queryParams);
	}
);

export const createEvent = createAsyncThunk(
	"events/postEvents",
	async (body: CreateEvents) => {
		return await postEvent(body);
	}
);

export const removeEvent = createAsyncThunk(
	"events/deleteEvent",
	async (data: string) => {
		return await deleteEvent(data);
	}
);

export const modifyEvent = createAsyncThunk(
	"events/updateEvent",
	async (data: EventUpdateData) => {
		return await putEvent(data);
	}
);

export const EventsSlice = createSlice({
	name: "Events",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchEvents.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.hasMore = true;
			state.Events = payload;
		});
		builder.addCase(fetchEvents.rejected, (state) => {
			state.status = Status.FAILED;
		});
		builder.addCase(createEvent.fulfilled, (state, { payload }) => {
			state.status = Status.SUCCEEDED;
			state.Events.push(payload);
		});
		builder.addCase(countEvents.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(countEvents.fulfilled, (state, action) => {
			state.status = Status.SUCCEEDED;
			state.count = action.payload;
		});
		builder.addCase(countEvents.rejected, (state) => {
			state.status = Status.FAILED;
		});
	},
});

export const selectAllEvents = ({
	Events,
}: StoreState): EventsReducer => Events;
export default EventsSlice.reducer;
