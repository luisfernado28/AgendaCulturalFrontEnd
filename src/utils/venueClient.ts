import { CreateVenue, Venue } from '../redux/types';

let routes: string
if (process.env.REACT_APP_EVENTS_API !== undefined) {
    routes = `${process.env.REACT_APP_EVENTS_API}/venues`
  }
export async function getVenueById(venueId: string): Promise<Venue> {
    try {
        const headers: any = {
            'Content-Type': 'application/json',

        }
        const response = await fetch(`${routes}/${venueId}`, {
            method: 'GET',
            headers,
        })
        const results = await response.json();
        return results;
    } catch (error) {
        throw new Error();
        //throw new Error(error.toString())
    }
}

export async function getVenues(): Promise<Venue[]> {
    try {
      const response = await fetch(routes);
      const results = await response.json();
      return results;
    } catch (error) {
      throw new Error();
      //throw new Error(error.toString())
    }
  }
  
export async function postVenue(params: CreateVenue): Promise<Venue> {
  try {
    const { ...body } = params
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