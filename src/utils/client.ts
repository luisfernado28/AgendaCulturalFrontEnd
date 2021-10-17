let routes: string

// if (process.env.EVENTS_APP_API !== undefined) {
  routes = `${process.env.EVENTS_APP_API}/events`
  routes = `http://localhost:5000/v1.0/events`
// }

export async function getEvents() {
  try {
    console.log(routes);
    const response = await fetch(routes);
    const results = await response.json();
    return results;
  } catch (error) {
    //throw new Error(error.toString())
  }
}