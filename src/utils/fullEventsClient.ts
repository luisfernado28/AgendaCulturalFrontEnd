import {
	CreateEvent,
	Event,
	EventUpdateData,
	FullEvent,
	QueryParams,
	UpdateEvent,
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