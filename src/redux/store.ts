import { configureStore } from "@reduxjs/toolkit"
import eventSlice from "./eventSlice";
import eventsSlice from "./eventsSlice"
import venueSlice from "./venueSlice"
import venuesSlice from "./venuesSlice";

const store = configureStore({
  reducer: {
    event: eventSlice,
    events: eventsSlice,
    venue: venueSlice,
    venues: venuesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store
