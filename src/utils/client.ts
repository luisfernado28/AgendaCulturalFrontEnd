import {
	CreateEvent,
	Event,
	EventUpdateData,
	QueryParams,
	UpdateEvent,
} from "../redux/types";
import { buildFilter, buildOrderBy2 } from "./buildOdataParams";
import { o, OdataQuery } from "odata";

let routes: string;

if (process.env.REACT_APP_EVENTS_API !== undefined) {
	routes = `${process.env.REACT_APP_EVENTS_API}/events`;
}
export async function getEvents(queryParams?: QueryParams): Promise<Event[]> {
	try {
		if (queryParams) {
			const params: OdataQuery = {};
			const { filter, orderby } = queryParams;
			if (filter) params.$filter = buildFilter(filter);
			if (orderby) params.$orderby = buildOrderBy2(orderby);
			const response = await o(routes).get("events").query(params);
			const results = await response;
			return results;
		} else {
			const response = await o(routes).get("events").query();
			const results = await response;
			return results;
		}
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw new Error(e.message);
		} else {
			throw new Error("Internal server error please contact admin");
		}
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
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw new Error(e.message);
		} else {
			throw new Error("Internal server error please contact admin");
		}
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
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw new Error(e.message);
		} else {
			throw new Error("Internal server error please contact admin");
		}
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
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw new Error(e.message);
		} else {
			throw new Error("Internal server error please contact admin");
		}
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
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw new Error(e.message);
		} else {
			throw new Error("Internal server error please contact admin");
		}
	}
}
