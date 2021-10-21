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
export interface VenueReducer {
  error: Error
  Venue: Venue
  venueStatus: string
}

export interface StoreState {
  events: EventsReducer
  venue: VenueReducer
}