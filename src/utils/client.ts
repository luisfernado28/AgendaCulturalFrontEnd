import {
	CreateEvent,
	Event,
	EventUpdateData,
	QueryParams,
	UpdateEvent,
} from "../redux/types";
import {
	buildFilter,
	buildOrderBy,
	buildQueryParams,
} from "./buildOdataParams";
import { o } from "odata";

let routes: string;

if (process.env.REACT_APP_EVENTS_API !== undefined) {
	routes = `${process.env.REACT_APP_EVENTS_API}/events`;
}
export async function getEvents(queryParams?: QueryParams): Promise<Event[]> {
	try {
		let path = routes;
		const path2 = o(routes).get("events");

		// const data1 = await o(routes).get("events")
		//.query({ $top: 3 });
		//console.log(data1);
		if (queryParams) {
			const { filter, orderby, pagination } = queryParams;
			let r = "";
			if (filter) {
				r = buildFilter(filter);
				console.log(r);
				path2.query({ $filter: r });
			}
			console.log(path2);

			const res = await o(routes).get("events").query({ r });
			console.log(res);
			// const { filter, orderby, pagination } = queryParams;
			// path = path + "?";
			// path = filter ? `${path}${buildQueryParams(filter)}` : path;
			// if (orderby) {
			// 	if (filter) path = path + "&";
			// 	path = orderby ? `${path}${buildOrderBy(orderby)}` : path;
			// }
			// if (pagination) {
			// 	if (filter || orderby) path = path + "&";
			// 	//code for pagination
			// }
		}
		const response = await fetch(path);
		const results = await response.json();
		return results;
	} catch (error) {
		throw new Error();
		//throw new Error(error.toString())
	}
}

export async function getEventById(eventId: string): Promise<Event> {
	try {
		const headers: any = {
			"Content-Type": "application/json",
		};
		const response = await fetch(`${routes}/${eventId}`, {
			method: "GET",
			headers,
		});
		const results = await response.json();
		return results;
	} catch (error) {
		throw new Error();
		//throw new Error(error.toString())
	}
}

export async function postEvent(params: CreateEvent): Promise<Event> {
	try {
		const { ...body } = params;
		const res = await fetch(routes, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await res.json();
		return result;
	} catch (error) {
		throw new Error();
	}
}

export async function putEvent({
	body,
	eventId,
}: EventUpdateData): Promise<UpdateEvent> {
	try {
		await fetch(`${routes}/${eventId}`, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { ...body };
	} catch (error) {
		throw new Error();
	}
}

export async function deleteEvent(eventId: string): Promise<void> {
	try {
		await fetch(`${routes}/${eventId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		throw new Error();
	}
}
