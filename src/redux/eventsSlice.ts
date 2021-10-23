import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEvents, postEvent } from '../utils/client'
import { EventsReducer, StoreState } from './stateTypes'
import { CreateEvent, Event, Status } from './types'

const initialState: EventsReducer = {
  events: [
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
    return await getEvents()
  },
)

export const createEvent = createAsyncThunk(
  'events/postEvents',
  async (body: CreateEvent) => {
    return await postEvent(body)
  },
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: { },
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
export default eventsSlice.reducer
