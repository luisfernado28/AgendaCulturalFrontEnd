/** @jsxImportSource theme-ui */
import { Button, Container, Grid, Select, Text } from "theme-ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextAreaInput from "../components/TextAreaInput";
import TextInput from "../components/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
	Event,
	Venue,
	UpdateEvent,
	Dates,
	EventTypeStatus,
	Status,
	UpdateFullEvent,
	FullEvent,
} from "../redux/types";
import ImageUpload from "../components/ImageUpload";
import { useState, useEffect } from "react";
import { postImage } from "../utils/blobStorageClient";
import { fetchVenues, selectAllVenues } from "../redux/venuesSlice";
import React from "react";
import RadioButton from "../components/RadioButton";
import CalendarItem from "../components/CalendarItem";
import TimePickerItem from "../components/TimeItem";
import PageSpinner from "./Spinner";
import { modifyFullEvent } from "../redux/fullEventsSlice";
import { DateObject } from "react-multi-date-picker";

export interface FormProps {
	title: string;
	artist: string;
	venueId: string;
	price: number;
	phone: string;
	type: EventTypeStatus;
	description: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	imageUrl?: string;
	dates: Dates;
	event: Event;
}

export interface Values {
	title: string;
	artist: string;
	venueId: string;
	// status: number,
	price: number;
	phone: string;
	type: EventTypeStatus;
	description: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	imageUrl?: string;
	// tagsId?: string[],
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

const CreateEventSchema = Yup.object().shape({
	title: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El titulo no puede tener mas que 50 caracteres ")
		.required("Titulo del evento es requerido"),
	artist: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El artista no puede tener mas que 50 caracteres ")
		.required("Artista del evento es requerido"),
	price: Yup.number()
		.max(1000, "El precio no puede ser superior a 1000 Bs")
		.required("El precio es requerido, ingrese 0 si es gratuito"),
	description: Yup.string()
		.min(1, "Al menos un caracter de descripción")
		.max(1000, "La descripcion no puede ser mayor a 1000 caracteres ")
		.required("La descripcion es requerida"),
	website: Yup.string().url("Link debe ser una URL valida "),
	twitter: Yup.string().url("Link debe ser una URL valida de Twitter"),
	facebook: Yup.string().url("Link debe ser una URL valida de Facebook"),
	instagram: Yup.string().url("Link debe ser una URL valida de Instagra"),
	phone: Yup.string(),
	venueWebsite: Yup.string().url("Link debe ser una URL valida "),
	venueTwitter: Yup.string().url("Link debe ser una URL valida de Twitter"),
	venueFacebook: Yup.string().url("Link debe ser una URL valida de Facebook"),
	venueInstagram: Yup.string().url(
		"Link debe ser una URL valida de Instagra"
	),
	venueName: Yup.string()
		.min(1, "Al menos un caracter")
		.max(
			100,
			"El nombre del espacio no puede tener mas que 100 caracteres "
		)
		.required("Nombre del espacio es requerido"),
	address: Yup.string()
		.min(1, "Al menos un caracter")
		.max(200, "La direccion no puede tener mas que 200 caracteres ")
		.required("Direccion del espacio es requerida"),
});
function UpdateEventForm2(eventForUpdate: FullEvent): JSX.Element {
	const dispatch = useDispatch();
	const [image, setImage] = useState<File>();
	const { venues, status } = useSelector(selectAllVenues);

	const [venueIdValue, setValueDropdown] = React.useState(
		eventForUpdate.venueId
	);
	const [statusValue, setValueRadio] = React.useState(eventForUpdate.type);
	const [calendarValue, setCalendarValue] = useState(
		eventForUpdate.dates.map((date) => {
			return new Date(date);
		})
	);
	const [timeValue, settimeValue] = useState(new DateObject(eventForUpdate.time));
	const [rangeOrMultipleValue, setrangeOrMultipleValue] = useState(
		eventForUpdate.areIndependent.toString()
	);

	useEffect(() => {
		dispatch(fetchVenues());
	}, [dispatch]);

	const handlerangeOrMultipleValue = (e: any) => {
		setrangeOrMultipleValue(e.target.value);
	};

	const handleChange = (e: any) => {
		setValueRadio(e.target.value);
	};
	const handletimeChange = (e: DateObject) => {
		settimeValue(e);
	};

	const calendarOnChange = (e: any) => {
		setCalendarValue(e);
	};

	const handleSubmit = async (values: Values) => {
		let newImageUrl: string = "";
		values.type = statusValue;
		const updatedEvent: UpdateFullEvent = {
			...values,
			status: 1,
			venueId: venueIdValue,
			imageUrl: "",
			areIndependent: rangeOrMultipleValue === "true",
			dates: calendarValue.map((date) => {
				return new Date(date.toString()).toISOString();
			}),
			time: timeValue.toDate().toISOString(),
			tags: [],
			
		};
		if (image) {
			newImageUrl = await postImage(image);
			updatedEvent.imageUrl = "/eventsimages/" + newImageUrl;
		}
		await dispatch(
			modifyFullEvent({ body: updatedEvent, fullEventId: eventForUpdate.id })
		);
	};

	const initialValues: Values = {
		title: eventForUpdate.title,
		artist: eventForUpdate.artist,
		venueId: eventForUpdate.venueId,
		price: eventForUpdate.price,
		phone: eventForUpdate.phone,
		type: eventForUpdate.type,
		description: eventForUpdate.description,
		website: eventForUpdate.website,
		facebook: eventForUpdate.facebook,
		twitter: eventForUpdate.twitter,
		instagram: eventForUpdate.instagram,
		imageUrl: eventForUpdate.imageUrl,
		venueName: eventForUpdate.venueName,
		address: eventForUpdate.address,
		venueWebsite: eventForUpdate.website,
		venueFacebook: eventForUpdate.venueFacebook,
		venueTwitter: eventForUpdate.venueTwitter,
		venueInstagram: eventForUpdate.venueInstagram,
		venueDescription: eventForUpdate.venueDescription,
		locationType: eventForUpdate.locationType,
		locationCoordinates: eventForUpdate.locationCoordinates,
	};
	const venuesListDrop = venues.map((venue: Venue) => {
		return (
			<option value={venue.id} key={venue.id}>
				{venue.name}
			</option>
		);
	});

	if (status === Status.IDLE) {
		return <div></div>;
	}
	if (status === Status.LOADING) {
		return <PageSpinner />;
	}
	if (status === Status.FAILED) {
		return <div> Failure Fetching Data</div>;
	}
	return (
		<div>
			<Text>Actualiza un evento</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={CreateEventSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						{initialValues.imageUrl === "" ? (
							<ImageUpload
								fromChild={(local: File) => setImage(local)}
								alt={""}
							/>
						) : (
							<ImageUpload
								fromChild={(local: File) => setImage(local)}
								alt={`${process.env.REACT_APP_Blob_API}${initialValues.imageUrl}`}
							/>
						)}
						<Grid columns={[3]}>
							<Container>
								<TextInput
									name="title"
									label="Titulo"
									placeholder="Titulo del evento"
									type="text"
								/>
								<TextInput
									name="artist"
									label="Artista"
									placeholder="Artista"
									type="text"
								/>
								Espacio
								<Select
									value={venueIdValue}
									onChange={(e) =>
										setValueDropdown(e.currentTarget.value)
									}
								>
									<option key="Sin espacio" value="No Venue">
										--Sin Espacio--
									</option>
									{venuesListDrop}
								</Select>
								<TextInput
									name="price"
									label="Precio"
									placeholder="Bs."
									type="number"
								/>
								<TextAreaInput
									name="description"
									label="Descripción"
									placeholder="Descripción del evento"
									type="text"
								/>
								<Container
									sx={{
										display: "flex",
										justifyContent: "space-evenly",
										width: "75%",
										"@media screen and (max-width:1400px)":
											{
												flexDirection: "column",
											},
									}}
								>
									<RadioButton
										id="Hibrido"
										label="Hibrido"
										name="statusValue"
										onChange={handleChange}
										value={EventTypeStatus.HYBRID}
										defaultChecked={
											parseInt(
												initialValues.type.toString()
											) === EventTypeStatus.HYBRID
										}
									/>
									<RadioButton
										id="Presencial"
										label="Presencial"
										name="statusValue"
										onChange={handleChange}
										value={EventTypeStatus.LIVE}
										defaultChecked={
											parseInt(
												initialValues.type.toString()
											) === EventTypeStatus.LIVE
										}
									/>
									<RadioButton
										id="Virtual"
										label="Virtual"
										name="statusValue"
										onChange={handleChange}
										value={EventTypeStatus.VIRTUAL}
										defaultChecked={
											parseInt(
												initialValues.type.toString()
											) === EventTypeStatus.VIRTUAL
										}
									/>
								</Container>
								<Container>
									<RadioButton
										id="Rango"
										label="Rango de fechas"
										name="rangeCalendar"
										onChange={handlerangeOrMultipleValue}
										value="true"
										defaultChecked={
											rangeOrMultipleValue === "true"
										}
									/>
									<RadioButton
										id="Individuales"
										label="Fechas individuales"
										name="rangeCalendar"
										onChange={handlerangeOrMultipleValue}
										value="false"
										defaultChecked={
											rangeOrMultipleValue === "false"
										}
									/>
									<CalendarItem
										value={calendarValue}
										rangeOrMultiuple={rangeOrMultipleValue}
										onChange={calendarOnChange}
									/>
									<TimePickerItem
										value={timeValue}
										onChange={handletimeChange}
									/>
								</Container>
							</Container>
							<Container>
								<Text> Redes Sociales</Text>
								<TextInput
									name="facebook"
									label="Facebook"
									placeholder="https://facebook"
									type="url"
								/>
								<TextInput
									name="twitter"
									label="Twitter"
									placeholder="https://twitter"
									type="url"
								/>
								<TextInput
									name="instagram"
									label="Instagram"
									placeholder="https://Instagram"
									type="url"
								/>
								<TextInput
									name="website"
									label="Pagina Web"
									placeholder="https://"
									type="url"
								/>
								<TextInput
									name="phone"
									label="Telefono"
									placeholder=""
									type="string"
								/>
							</Container>
							<Container>
								<Text>Informacion de espacio</Text>
								<TextInput
									name="venueName"
									label="Nombre de Espacio"
									type="string"
								/>
								<TextInput
									name="address"
									label="Direccion de Espacio"
									type="string"
								/>
								<TextInput
									name="venueFacebook"
									label="Facebook de Espacio"
									placeholder="https://facebook"
									type="url"
								/>
								<TextInput
									name="venueTwitter"
									label="Twitter de Espacio"
									placeholder="https://twitter"
									type="url"
								/>
								<TextInput
									name="venueInstagram"
									label="Instagram de Espacio"
									placeholder="https://Instagram"
									type="url"
								/>
								<TextInput
									name="venueWebsite"
									label="Pagina Web de Espacio"
									placeholder="https://"
									type="url"
								/>
							</Container>
						</Grid>

						<Container
							sx={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<Button sx={{ marginLeft: "8px" }} type="submit">
								Create
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</div>
	);
}
export default UpdateEventForm2;
