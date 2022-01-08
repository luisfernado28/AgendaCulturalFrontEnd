import { CreateUser, User } from '../redux/types';

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


export async function postUser(params: CreateUser): Promise<User> {
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

export async function deleteUser(userId: string): Promise<void> {
    try {
      await fetch(`${routes}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error()
    }
  }
  