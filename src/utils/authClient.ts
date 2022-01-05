import { User } from '../redux/types';

let routes: string
if (process.env.REACT_APP_EVENTS_API !== undefined) {
    routes = `${process.env.REACT_APP_EVENTS_API}/auth`
}

export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(routes);
        const results = await response.json();
        return results;
    } catch (error) {
        throw new Error();
    }
}