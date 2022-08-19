/*
 * File: buildOdataParams.ts
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Filter, PaginationContent } from "../redux/types";

export const buildQueryParams = (filter: Filter): string => {
	let res: string = "$filter=(";
	for (const field in filter) {
		const currentRule = buildRule(field, filter);
		res = res + currentRule + " or ";
	}
	res = res.slice(0, -4);
	return res + ")";
};

const buildRule = (rule: string, ruleArray: any): string => {
	return "contains(tolower(" + rule + "), tolower('" + ruleArray[rule] + "'))";
};

export const buildOrderBy = (orderByFilters: string[]): string => {
	let filter = "$orderby=";
	orderByFilters.forEach((field: string) => {
		filter = filter + " " + field + ", ";
	});
	filter = filter.slice(0, -2);
	return filter;
};

export const buildFilter = (filter: Filter): string => {
	let res: string = "";
	for (const field in filter) {
		const currentRule = buildRule(field, filter);
		res = res + currentRule + " or ";
	}
	res = res.slice(0, -4);
	return res + "";
};

export const buildOrderBy2 = (orderByFilters: string[]): string => {
	let filter = "";
	orderByFilters.forEach((field: string) => {
		filter = filter + " " + field + ", ";
	});
	filter = filter.slice(0, -2);
	return filter;
};

export const buildPagination = (pagination: PaginationContent): string => {
	return "";
};

export const buildPaginationSize = (
	totalElements: number,
	numberOfElementsOnSceen: number
): number => {
	if (totalElements <= numberOfElementsOnSceen) {
		return 1;
	} else if (totalElements % numberOfElementsOnSceen === 0) {
		return Math.floor(totalElements / numberOfElementsOnSceen);
	} else {
		return Math.floor(totalElements / numberOfElementsOnSceen) + 1;
	}
};
