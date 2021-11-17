import { Event , Venue} from './types'


export interface Error {
  code: string
  message: string
}


export interface EventsReducer {
  error: Error
  events: Event[]
  hasMore: boolean
  status: string
}
export interface EventReducer {
  error: Error
  event: Event
  eventStatus: string
}
export interface VenuesReducer {
  error: Error
  venues: Venue[]
  hasMore: boolean
  status: string
}
export interface VenueReducer {
  error: Error
  Venue: Venue
  venueStatus: string
}

export interface StoreState {
  event: EventReducer
  events: EventsReducer
  venue: VenueReducer
  venues: VenuesReducer
}