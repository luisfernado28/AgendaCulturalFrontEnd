import { configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import eventSlice from "./eventSlice";
import eventsSlice from "./eventsSlice"
import fullEventsSlice  from "./fullEventsSlice";
import userSlice from "./userSlice";
import usersSlice from "./usersSlice";
import venueSlice from "./venueSlice"
import venuesSlice from "./venuesSlice";


const persistConfig = {
  blacklist: ['requestError', 'requestErrorCode', 'requestStatus'],
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    event: eventSlice,
    events: eventsSlice,
    venue: venueSlice,
    venues: venuesSlice,
    users: usersSlice,
    user: userSlice,
    fullEvents: fullEventsSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store
