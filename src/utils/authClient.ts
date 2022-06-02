import { o, OdataQuery } from "odata";
import {
	CreateUser,
	QueryParams,
	UpdateUser,
	User,
	UserCredentials,
	UserCredentialsResponse,
	UserUpdateData,
} from "../redux/types";
import { buildFilter, buildOrderBy2 } from "./buildOdataParams";

let routes: string;
if (process.env.REACT_APP_EVENTS_API !== undefined) {
	routes = `${process.env.REACT_APP_EVENTS_API}/auth`;
}

export async function getUsers(queryParams?: QueryParams): Promise<User[]> {
	try {
		if (queryParams) {
			const params: OdataQuery = {};
			const { filter, orderby, pagination } = queryParams;
			if (filter) params.$filter = buildFilter(filter);
			if (orderby) params.$orderby = buildOrderBy2(orderby);
			if (pagination) params.$top = pagination.top;
			if (pagination) params.$skip = pagination.skip;
			params.$count = true;
			const response = await o("https://localhost:44337")
				.get("Users")
				.query(params);
			return response;
		} else {
			const response = await o("https://localhost:44337")
				.get("Users")
				.query();
			const results = await response;
			return results;
		}
		// const response = await fetch(routes);
		// const results = await response.json();
	} catch (error) {
		throw new Error();
	}
}
export async function getCountUsers(queryParams?: QueryParams): Promise<number> {
	try {
		if (queryParams) {
			const params: OdataQuery = {};
			const { filter, orderby, pagination } = queryParams;
			if (filter) params.$filter = buildFilter(filter);
			if (orderby) params.$orderby = buildOrderBy2(orderby);
			if (pagination) params.$top = pagination.top;
			if (pagination) params.$skip = pagination.skip;
			params.$count = true;
			const response = await o("https://localhost:44337")
			.get("Users/$count")
				.query(params);
			return response;
		} else {
			const response = await o("https://localhost:44337")
			.get("Users/$count")
				.query();
			const results = await response;
			return results;
		}
		
	} catch (error) {
		throw new Error();
	}
}

export async function getUserById(userId: string): Promise<User> {
	try {
		const headers: any = {
			"Content-Type": "application/json",
		};
		const response = await fetch(`${routes}/${userId}`, {
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
export async function patchtUser({
	body,
	userId,
}: UserUpdateData): Promise<UpdateUser> {
	try {
		await fetch(`${routes}/${userId}`, {
			method: "PATCH",
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

export async function postUser(params: CreateUser): Promise<User> {
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

export async function deleteUser(userId: string): Promise<void> {
	try {
		await fetch(`${routes}/${userId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		throw new Error();
	}
}

export async function postAuth(
	body: UserCredentials
): Promise<{ user: UserCredentialsResponse; status: number }> {
	try {
		const res = await fetch(`${routes}/token`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result: UserCredentialsResponse = await res.json();
		return { user: result, status: res.status };
		// return result;
	} catch (error) {
		throw new Error();
	}
}

export async function logOutAuth(
	currentUserCredentials: UserCredentialsResponse
) {
	try {
		const res = await fetch(`${routes}/logoff`, {
			method: "POST",
			body: JSON.stringify(currentUserCredentials),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { status: res.status };
	} catch (error) {
		throw new Error();
	}
}
