import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../utils/authClient'

import { StoreState, UsersReducer } from './stateTypes'
import { Status } from './types'


const initialState: UsersReducer = {
    error: {
        code: '',
        message: '',
    },
    users: [],
    hasMore: true,
    status: Status.IDLE,
}

export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async () => {
        return await getUsers()
    }
)


export const usersSlice = createSlice({
    name: 'venues',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchUsers.pending, state => {
        state.status = Status.LOADING
      })
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED
        state.users = action.payload
      })
      builder.addCase(fetchUsers.rejected, state => {
        state.status = Status.FAILED
      })
    },
  })
  
  export const selectAllUsers = ({ users }: StoreState): UsersReducer => users
  export default usersSlice.reducer
  