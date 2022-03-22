import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextAreaInput from "../components/TextAreaInput";
import TextInput from "../components/TextInput";
import { useDispatch } from "react-redux";
import {
	Event,
	Dates,
	EventTypeStatus,
	UpdateFullEvent,
	FullEvent,
} from "../redux/types";
import ImageUpload from "../components/ImageUpload";
import { useState } from "react";
import { postImage } from "../utils/blobStorageClient";
import React from "react";
import RadioButton from "../components/RadioButton";
import CalendarItem from "../components/CalendarItem";
import TimePickerItem from "../components/TimeItem";
import { modifyFullEvent } from "../redux/fullEventsSlice";
import { DateObject } from "react-multi-date-picker";
import {
	Button,
	Container,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import createImageForBlob from "../utils/utils";

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
	type: string;
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

	const [statusValue, setValueRadio] = useState(
		EventTypeStatus[eventForUpdate.type]
	);
	const [calendarValue, setCalendarValue] = useState(
		eventForUpdate.dates.map((date) => {
			return new Date(date);
		})
	);
	const [timeValue, settimeValue] = useState(
		new DateObject(eventForUpdate.time)
	);

	const [rangeOrMultipleValue, setrangeOrMultipleValue] = useState(
		eventForUpdate.areIndependent
	);
	const handlerangeOrMultipleValue = (e: any) => {
		setrangeOrMultipleValue(e.target.value.toString());
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
			venueId: "",
			imageUrl: eventForUpdate.imageUrl,
			areIndependent: rangeOrMultipleValue,
			dates: calendarValue.map((date) => {
				return new Date(date.toString()).toISOString();
			}),
			time: timeValue.toDate().toISOString(),
			tags: [],
		};
		if (image) {
			const setFile = createImageForBlob({
				image: image,
				title: values.title,
				venueName: values.venueName,
				calendarValue: calendarValue[0],
			});
			newImageUrl = await postImage(setFile);
			updatedEvent.imageUrl = newImageUrl; // "/eventsimages/" + newImageUrl;
		}
		await dispatch(
			modifyFullEvent({
				body: updatedEvent,
				fullEventId: eventForUpdate.id,
			})
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
	const formik = useFormik({
		initialValues: {
			title: eventForUpdate.title,
			artist: eventForUpdate.artist,
			price: eventForUpdate.price,
			description: eventForUpdate.description,
			type: eventForUpdate.type,
			venueId: "",
			website: eventForUpdate.website,
			facebook: eventForUpdate.facebook,
			twitter: eventForUpdate.twitter,
			instagram: eventForUpdate.instagram,
			imageUrl: eventForUpdate.imageUrl,
			phone: eventForUpdate.phone,
			venueName: eventForUpdate.venueName,
			address: eventForUpdate.address,
			venueWebsite: eventForUpdate.website,
			venueFacebook: eventForUpdate.venueFacebook,
			venueTwitter: eventForUpdate.venueTwitter,
			venueInstagram: eventForUpdate.venueInstagram,
			venueDescription: eventForUpdate.venueDescription,
			locationType: "",
			locationCoordinates: [],
		},
		validationSchema: CreateEventSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<div>
			Actualiza un evento
			<form onSubmit={formik.handleSubmit}>
				{initialValues.imageUrl === "" ? (
					<ImageUpload
						fromChild={(local: File) => setImage(local)}
						alt={""}
					/>
				) : (
					<ImageUpload
						fromChild={(local: File) => setImage(local)}
						alt={`${process.env.REACT_APP_Blob_API}/eventsimages/${initialValues.imageUrl}`}
					/>
				)}
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<div>
							<br />
							Titulo
							<TextField
								id="title"
								name="title"
								label="Titulo"
								value={formik.values.title}
								onChange={formik.handleChange}
								error={
									formik.touched.title &&
									Boolean(formik.errors.title)
								}
								helperText={
									formik.touched.title && formik.errors.title
								}
							/>
							<br />
							Artista
							<TextField
								id="artist"
								name="artist"
								label="Artista"
								value={formik.values.artist}
								onChange={formik.handleChange}
								error={
									formik.touched.artist &&
									Boolean(formik.errors.artist)
								}
								helperText={
									formik.touched.artist &&
									formik.errors.artist
								}
							/>
							<br />
							Precio
							<TextField
								name="price"
								label="Precio"
								id="price"
								value={formik.values.price}
								onChange={formik.handleChange}
								error={
									formik.touched.price &&
									Boolean(formik.errors.price)
								}
								helperText={
									formik.touched.price && formik.errors.price
								}
								type="number"
							/>
							<br />
							Descripción
							<TextField
								name="description"
								label="Descripción"
								id="price"
								value={formik.values.description}
								onChange={formik.handleChange}
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={
									formik.touched.description &&
									formik.errors.description
								}
								multiline
								rows={6}
							/>
							<br />
							Tipo de evento
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
								value={statusValue}
								onChange={handleChange}
								defaultValue={statusValue}
							>
								<FormControlLabel
									value={EventTypeStatus.HYBRID} //"Hibrido"
									control={<Radio />}
									label="Hibrido"
								/>
								<FormControlLabel
									value={EventTypeStatus.LIVE} //"Presencial"
									control={<Radio />}
									label="Presencial"
								/>
								<FormControlLabel
									value={EventTypeStatus.VIRTUAL} //"Virtual"
									control={<Radio />}
									label="Virtual"
								/>
							</RadioGroup>
							<Container>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
									value={rangeOrMultipleValue}
									onChange={handlerangeOrMultipleValue}
									defaultValue={rangeOrMultipleValue}
								>
									<FormControlLabel
										value={false}
										control={<Radio />}
										label="Rango de fechas"
									/>
									<FormControlLabel
										value={true}
										control={<Radio />}
										label="Fechas individuales"
									/>
								</RadioGroup>

								<CalendarItem
									value={calendarValue}
									rangeOrMultiuple={rangeOrMultipleValue.toString()}
									onChange={calendarOnChange}
								/>
								<TimePickerItem
									value={timeValue}
									onChange={handletimeChange}
								/>
							</Container>
						</div>
					</Grid>
					<Grid item xs={4}>
						<Container>
							Redes Sociales
							<TextField
								id="facebook"
								name="facebook"
								label="Facebook"
								value={formik.values.facebook}
								onChange={formik.handleChange}
								error={
									formik.touched.facebook &&
									Boolean(formik.errors.facebook)
								}
								helperText={
									formik.touched.facebook &&
									formik.errors.facebook
								}
							/>
							<TextField
								id="twitter"
								name="twitter"
								label="Twitter"
								value={formik.values.twitter}
								onChange={formik.handleChange}
								error={
									formik.touched.twitter &&
									Boolean(formik.errors.twitter)
								}
								helperText={
									formik.touched.twitter &&
									formik.errors.twitter
								}
							/>
							<TextField
								id="instagram"
								name="instagram"
								label="Instagram"
								value={formik.values.instagram}
								onChange={formik.handleChange}
								error={
									formik.touched.instagram &&
									Boolean(formik.errors.instagram)
								}
								helperText={
									formik.touched.instagram &&
									formik.errors.instagram
								}
							/>
							<TextField
								id="website"
								name="website"
								label="Pagina Web"
								value={formik.values.website}
								onChange={formik.handleChange}
								error={
									formik.touched.website &&
									Boolean(formik.errors.website)
								}
								helperText={
									formik.touched.website &&
									formik.errors.website
								}
							/>
							<TextField
								id="phone"
								name="phone"
								label="Telefono"
								value={formik.values.phone}
								onChange={formik.handleChange}
								error={
									formik.touched.phone &&
									Boolean(formik.errors.phone)
								}
								helperText={
									formik.touched.phone && formik.errors.phone
								}
							/>
						</Container>
					</Grid>
					<Grid item xs={4}>
						<Container>
							Informacion de espacio
							<TextField
								id="venueName"
								name="venueName"
								label="Nombre del espacio"
								value={formik.values.venueName}
								onChange={formik.handleChange}
								error={
									formik.touched.venueName &&
									Boolean(formik.errors.venueName)
								}
								helperText={
									formik.touched.venueName &&
									formik.errors.venueName
								}
							/>
							<TextField
								id="address"
								name="address"
								label="Direccion de Espacio"
								value={formik.values.address}
								onChange={formik.handleChange}
								error={
									formik.touched.address &&
									Boolean(formik.errors.address)
								}
								helperText={
									formik.touched.address &&
									formik.errors.address
								}
							/>
							<TextField
								id="venueFacebook"
								name="venueFacebook"
								label="Facebook de Espacio"
								value={formik.values.venueFacebook}
								onChange={formik.handleChange}
								error={
									formik.touched.venueFacebook &&
									Boolean(formik.errors.venueFacebook)
								}
								helperText={
									formik.touched.venueFacebook &&
									formik.errors.venueFacebook
								}
							/>
							<TextField
								id="venueTwitter"
								name="venueTwitter"
								label="Twitter de Espacio"
								value={formik.values.venueTwitter}
								onChange={formik.handleChange}
								error={
									formik.touched.venueTwitter &&
									Boolean(formik.errors.venueTwitter)
								}
								helperText={
									formik.touched.venueTwitter &&
									formik.errors.venueTwitter
								}
							/>
							<TextField
								id="venueInstagram"
								name="venueInstagram"
								label="Instagram de Espacio"
								value={formik.values.venueInstagram}
								onChange={formik.handleChange}
								error={
									formik.touched.venueInstagram &&
									Boolean(formik.errors.venueInstagram)
								}
								helperText={
									formik.touched.venueInstagram &&
									formik.errors.venueInstagram
								}
							/>
							<TextField
								id="venueWebsite"
								name="venueWebsite"
								label="Pagina Web de Espacio"
								value={formik.values.venueWebsite}
								onChange={formik.handleChange}
								error={
									formik.touched.venueWebsite &&
									Boolean(formik.errors.venueWebsite)
								}
								helperText={
									formik.touched.venueWebsite &&
									formik.errors.venueWebsite
								}
							/>
						</Container>
					</Grid>
				</Grid>
				<Button color="primary" variant="contained" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}
export default UpdateEventForm2;
