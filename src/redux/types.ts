export enum Status {
	IDLE = "idle",
	SUCCEEDED = "succeeded",
	FAILED = "failed",
	LOADING = "loading",
}

export enum EventStatus {
	CANCELED = "Canceled",
	DRAFT = "Draft",
	FINISHED = "Finished",
	PUBLISHED = "Published",
}


export enum EventTypeStatus {
	HYBRID,
	LIVE,
	VIRTUAL,
}


export interface CreateEvents{
	title: string;
	artist: string;
	status: string;
	price: number;
	phone: string;
	type: string;
	description: string;
	imageUrl?: string;
	areIndependent: boolean;
	dates: string[];
	time: string;
	tags?: string[];
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	venueId: string;
	venueName: string;
	address: string;
	venueWebsite: string;
	venueFacebook: string;
	venueTwitter: string;
	venueInstagram: string;
	venueDescription: string;
	locationType: string;
	locationCoordinates: number[];
}

export interface Dates {
	areindependent: boolean;
	dates: string[];
	time: string;
}

export interface Venue {
	id: string;
	name: string;
	address: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	description: string;
	location: GoogleLocation;
}

export interface GoogleLocation {
	type: string;
	coordinates: number[];
}

export interface CreateVenue {
	name: string;
	address: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
}



export interface EventUpdateData {
	body: UpdateEvent;
	EventId?: string;
}

export enum ModalTypes {
	ConfirmDeleteModalValues = "confirmDelete",
	DeleteSucceededModalValues = "deleteSucceeded",
	ConfirmUpdateModalValues = "confirmUpdate",
	UpdateSucceededModalValues = "updateSucceeded",
	SessionExpiredModal = "sessionExpired",
}

export interface Filter {
	title?: string;
	artist?: string;
	venueId?: string;
	status?: number;
	price?: number;
	id?: string;
	phone?: string;
	type?: EventTypeStatus;
	description?: string;
	website?: string;
	facebook?: string;
	twitter?: string;
	instagram?: string;
	imageUrl?: string;
	dates?: Dates;
	tagsId?: string[];
	time?: string;
	venueName?: string;
	orderby?: string[];
	username?: string;
	firstname?: string;
	lastname?: string;
}

export interface PaginationContent {
	top: number;
	skip: number;
}

export interface QueryParams {
	filter?: Filter;
	orderby?: string[];
	pagination?: PaginationContent;
	activeEvents?: Boolean;
}

export interface User {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	admin: boolean;
}
export interface CreateUser {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	admin: boolean;
}
export interface UpdateUser {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	admin: boolean;
}

export interface UserUpdateData {
	body: UpdateUser;
	userId?: string;
}

export interface UserCredentials {
	password: string;
	username: string;
}

export interface UserCredentialsResponse {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	admin: boolean;
	token: string;
}

export interface Event {
	id: string;
	title: string;
	artist: string;
	status: number;
	price: number;
	phone: string;
	type:  string;
	description: string;
	imageUrl: string;
	areIndependent: boolean;
	dates: string[];
	time: string;
	tags: string[];
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	venueId: string;
	venueName: string;
	address: string;
	venueWebsite: string;
	venueFacebook: string;
	venueTwitter: string;
	venueInstagram: string;
	venueDescription: string;
	locationType: string;
	locationCoordinates: number[];
}

export interface UpdateEvent {
	id?: string;
	title: string;
	artist: string;
	status: string;
	price: number;
	phone: string;
	type:  string;
	description: string;
	imageUrl: string;
	areIndependent: boolean;
	dates: string[];
	time: string;
	tags?: string[];
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	venueId: string;
	venueName: string;
	address: string;
	venueWebsite: string;
	venueFacebook: string;
	venueTwitter: string;
	venueInstagram: string;
	venueDescription: string;
	locationType: string;
	locationCoordinates: number[];
}