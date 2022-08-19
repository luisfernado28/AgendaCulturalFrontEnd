/*
 * File: stateTypes.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Event, User, Venue} from './types'


export interface Error {
  code: string
  message: string
}
export interface UsersReducer {
  error: Error
  users: User[]
  hasMore: boolean
  status: string
  count: number
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
  token: string
}
export interface EventsReducer {
  error: Error
  Events: Event[]
  hasMore: boolean
  status: string
  count: number
}

export interface EventReducer {
  error: Error
  Event: Event
  eventStatus: string
}

export interface StoreState {
  users: UsersReducer
  user: UserReducer
  auth : Authentication 
  Events: EventsReducer
  Event: EventReducer
}