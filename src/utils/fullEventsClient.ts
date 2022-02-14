import {
	CreateEvent,
	CreateFullEvents,
	Event,
	EventUpdateData,
	FullEvent,
	FullEventUpdateData,
	QueryParams,
	UpdateEvent,
	UpdateFullEvent,
} from "../redux/types";
import { o, OdataQuery } from "odata";
import { buildFilter, buildOrderBy2 } from "./buildOdataParams";


let routes: string;

if (process.env.REACT_APP_EVENTS_API !== undefined) {
	routes = `${process.env.REACT_APP_EVENTS_API}/fullEvents`;
}
export async function getFullEvents(queryParams?: QueryParams): Promise<FullEvent[]> {
	try {
		if (queryParams) {
			const params: OdataQuery = {};
			const { filter, orderby } = queryParams;
			if (filter) params.$filter = buildFilter(filter);
			if (orderby) params.$orderby = buildOrderBy2(orderby);
			const response = await o(routes).get("fullevents").query(params);
			const results = await response;
			return results;
		} else {
			const response = await o(routes).get("fullevents").query();
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

export async function postFullEvent(params: CreateFullEvents): Promise<FullEvent> {
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
export async function getFullEventById(fullEventId: string): Promise<FullEvent> {
	try {
		const headers: any = {
			"Content-Type": "application/json",
		};
		const response = await fetch(`${routes}/${fullEventId}`, {
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


export async function putFullEvent({
	body,
	fullEventId,
}: FullEventUpdateData): Promise<UpdateFullEvent> {
	try {
		await fetch(`${routes}/${fullEventId}`, {
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


export async function deleteFullEvent(fullEventId: string): Promise<void> {
	try {
		await fetch(`${routes}/${fullEventId}`, {
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
