export enum Status {
  IDLE = 'idle',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  LOADING = 'loading',
}

export enum EventStatus {
  CANCELED = 'Canceled',
  DRAFT = 'Draft',
  FINISHED = 'Finished',
  PUBLISHED = 'Published',
}

export interface Event {
  title: string,
  artist: string,
  venueId: string,
  status: number,
  price: number,
  id: string,
  phone: string,
  type: string,
  description: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string,
  imageUrl?: string,
  dates: Dates,
  tagsId?: string[],
  time?: string
}
  
export enum EventStatus {
  HYBRID = 'Hibrido' ,
  LIVE = 'Presencial',
  VIRTUAL = 'Virtual',
}

export interface CreateEvent {
  title: string,
  artist: string,
  venueId: string,
  status: number,
  price: number,
  phone: string,
  type: EventStatus,
  description: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string,
  imageUrl?: string,
  dates: Dates,
  tags?: string[],
}

export interface Dates{
  areindependent: boolean,
  dates: string[]
  time: string
}

export interface Venue {
  id: string,
  name: string,
  address: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string
}

export interface CreateVenue {
  name: string,
  address: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string
}

export interface EventUpdateData {
  body: UpdateEvent
  eventId?: string
}

export interface UpdateEvent {
  id?: string,
  title: string,
  artist: string,
  venueId: string,
  status: number,
  price: number,
  phone: string,
  type: EventStatus,
  description: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string,
  imageUrl?: string,
  dates: Dates,
  tags?: string[],
}

export enum ModalTypes {
  ConfirmDeleteModalValues = 'confirmDelete',
  DeleteSucceededModalValues = 'deleteSucceeded',
  ConfirmUpdateModalValues = 'confirmUpdate',
  UpdateSucceededModalValues = 'updateSucceeded',
  // SessionExpiredModal = 'sessionExpired',
}