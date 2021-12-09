import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getVenues, postVenue } from '../utils/venueClient'

import { VenuesReducer, StoreState } from './stateTypes'
import { CreateVenue, Status } from './types'


const initialState: VenuesReducer = {
  error: {
    code: '',
    message: '',
  },
  venues:[],
  hasMore: true,
  status: Status.IDLE,
}


export const fetchVenues = createAsyncThunk(
  'venue/fetchVenues',
  async () => {
    return await getVenues()
  },
)

export const createVenue = createAsyncThunk(
  'venue/postVenues',
  async (body: CreateVenue) => {
    return await postVenue(body)
  },
)
export const venuesSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVenues.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchVenues.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.venues = action.payload
    })
    builder.addCase(fetchVenues.rejected, state => {
      state.status = Status.FAILED
    })
    
    builder.addCase(createVenue.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCEEDED
      state.venues.push(payload)
    })
  },
})

export const selectAllVenues = ({ venues }: StoreState): VenuesReducer => venues
export default venuesSlice.reducer
