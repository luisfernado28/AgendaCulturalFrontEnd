import * as Yup from "yup";
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
	Box,
	Typography,
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
		values.type = statusValue.toString();
		const updatedEvent: UpdateFullEvent = {
			...values,
			status: "active",
			venueId: "",
			imageUrl: eventForUpdate.imageUrl,
			areIndependent: rangeOrMultipleValue,
			dates: calendarValue.map((date) => {
				return new Date(date.toString()).toISOString();
			}),
			time: timeValue.toDate().toISOString(),
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
				<Box
					sx={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
							backgroundColor: "#FFFFFF",
							margin: "20px",
							height: "200px",
							width: "300px",
						}}
					>
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
					</Box>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Grid container direction={"column"} spacing={3}>
							<Typography variant="h4" component="div">
								Informacion del evento
							</Typography>
							<Grid item>
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
										formik.touched.title &&
										formik.errors.title
									}
								/>
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
										formik.touched.price &&
										formik.errors.price
									}
									type="number"
								/>
							</Grid>

							<Grid item>
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
							</Grid>
							<Grid item>Tipo de evento</Grid>
							<Grid
								item
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
								}}
							>
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
							</Grid>
							<Grid item> Horario</Grid>
							<Grid item>
								<TimePickerItem
									value={timeValue}
									onChange={handletimeChange}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}
					>
						<Grid container direction={"column"} spacing={3}>
							<Grid item> Tipo de fecha</Grid>
							<Grid item>
								<Container>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										value={rangeOrMultipleValue}
										onChange={handlerangeOrMultipleValue}
										defaultValue={rangeOrMultipleValue}
										sx={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											alignContent: "center",
										}}
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
								</Container>
							</Grid>
							<Grid item>
								<Typography variant="h4" component="div">
									Fecha(s)
								</Typography>
							</Grid>
							<Grid item>
								<CalendarItem
									value={calendarValue}
									rangeOrMultiuple={rangeOrMultipleValue.toString()}
									onChange={calendarOnChange}
								/>
							</Grid>

							<Grid item>
								<Typography variant="h4" component="div">
									Redes Sociales del evento
								</Typography>
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>

							<Grid item>
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
							</Grid>

							<Grid item>
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
							</Grid>

							<Grid item>
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
										formik.touched.phone &&
										formik.errors.phone
									}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}
					>
						<Grid container direction={"column"} spacing={3}>
							<Typography variant="h4" component="div">
								Informacion de espacio
							</Typography>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
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
							</Grid>
							<Grid item>
								<Button
									color="primary"
									variant="contained"
									type="submit"
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}
export default UpdateEventForm2;
