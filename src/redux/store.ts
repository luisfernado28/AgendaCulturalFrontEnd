import { configureStore } from "@reduxjs/toolkit"
import eventsSlice from "./eventsSlice"
import venueSlice from "./venueSlice"

const store = configureStore({
  reducer: {
    events: eventsSlice,
    venue: venueSlice
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store
