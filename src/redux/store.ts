/*
 * File: store.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import EventSlice  from "./EventSlice";
import EventsSlice  from "./EventsSlice";
import userSlice from "./userSlice";
import usersSlice from "./usersSlice";


const persistConfig = {
  blacklist: ['requestError', 'requestErrorCode', 'requestStatus'],
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    users: usersSlice,
    user: userSlice,
    Events: EventsSlice,
    Event: EventSlice
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store
