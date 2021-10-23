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
  dates: string[],
  tagsId?: string[],
  time?: string
}
  

export interface CreateEvent {
  title: string,
  artist: string,
  venueId: string,
  status: number,
  price: number,
  phone: string,
  type: string,
  description: string,
  website: string,
  facebook: string,
  twitter: string,
  instagram: string,
  imageUrl?: string,
  dates: string[],
  tagsId?: string[],
  time?: string
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