import {CreateEvent, Event } from '../redux/types';

let routes: string

// if (process.env.EVENTS_APP_API !== undefined) {
  routes = `${process.env.EVENTS_APP_API}/events`
  routes = `http://localhost:5000/v1.0/events`
// }

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch(routes);
    const results = await response.json();
    return results;
  } catch (error) {
    throw new Error();
    //throw new Error(error.toString())
  }
}

export async function postEvent(params: CreateEvent): Promise<Event> {
  try {
    const {  ...body } = params
    const res = await fetch(routes, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    return result
  } catch (error) {
    throw new Error();
  }
}