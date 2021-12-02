import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getVenueById, getVenues, postVenue } from '../utils/venueClient'

import { VenueReducer, StoreState } from './stateTypes'
import { CreateVenue, Status } from './types'


const initialState: VenueReducer = {
  error: {
    code: '',
    message: '',
  },
  Venue:{
    id: "",
    name: "",
    address: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    description: "",
    location: {
      type: "",
      coordinates: []
    }
  },
  venueStatus: Status.IDLE,
}

export const fetchVenueById = createAsyncThunk(
  'venue/fetchById',
  async (venueId: string) => {
    return await getVenueById(venueId)
  },
)

export const createVenue = createAsyncThunk(
  'events/postEvents',
  async (body: CreateVenue) => {
    return await postVenue(body)
  },
)

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVenueById.pending, state => {
      state.venueStatus = Status.LOADING
    })
    builder.addCase(fetchVenueById.fulfilled, (state, action) => {
      state.venueStatus = Status.SUCCEEDED
      state.Venue = action.payload
    })
    builder.addCase(fetchVenueById.rejected, state => {
      state.venueStatus = Status.FAILED
    })
  },
})

export const singleVenue = ({ venue }: StoreState): VenueReducer => venue
export default venueSlice.reducer
