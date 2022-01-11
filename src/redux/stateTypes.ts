import { Event , User, Venue} from './types'


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
export interface UsersReducer {
  error: Error
  users: User[]
  hasMore: boolean
  status: string
}
export interface UserReducer {
  error: Error
  user: User
  userStatus: string
}
export interface Authentication {
  loggedIn: boolean
  requestError?: string
  requestErrorCode?: number
  requestStatus: string
  userInfo: userInfo
}
export interface userInfo {
  id: string,
  username: string,
  firstname: string,
  lastname: string,
  admin: boolean,
  token?: string
}
export interface StoreState {
  event: EventReducer
  events: EventsReducer
  venue: VenueReducer
  venues: VenuesReducer
  users: UsersReducer
  user: UserReducer
  auth : Authentication 

}