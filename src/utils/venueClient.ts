import { Venue } from '../redux/types';

let routes: string

routes = `http://localhost:5000/v1.0/venues`

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
