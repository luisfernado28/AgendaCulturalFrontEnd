import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEvents } from '../utils/client'
import { EventsReducer,StoreState } from './stateTypes'
import {Event ,Status } from './types'

const initialState: EventsReducer = {
    events: [
      {
        title: "",
        artist: "",
        venueId: "",
        status: 12,
        price: 23,
        id: "",
        phone: "",
        type: "",
        description: "",
        website: "",
        facebook: "",
        twitter: "",
        instagram: "",
      }
    ],
    error: {
      code: '',
      message: '',
    },
    hasMore: true,
    status: Status.IDLE,
  }

  export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async () => {
      console.log("asdfasdf");
      return await getEvents()
    },
  )

  export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
      MoreEvents(state) {
        state.hasMore = true
      },
      noMoreEvents(state) {
        state.hasMore = false
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchEvents.pending, state => {
        state.status = Status.LOADING
      })
      builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED
        state.hasMore = true
        state.events = payload
      })
      builder.addCase(fetchEvents.rejected, state => {
        state.status = Status.FAILED
      })
  
    },
  })

export const selectAllEvents = ({ events }: StoreState): EventsReducer => events
export const { MoreEvents, noMoreEvents } = eventsSlice.actions
export default eventsSlice.reducer
