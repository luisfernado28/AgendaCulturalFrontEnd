/** @jsxImportSource theme-ui */
import { Button, Container, Grid, Text } from "theme-ui";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextAreaInput from "../components/TextAreaInput";
import TextInput from "../components/TextInput";
import { useDispatch } from "react-redux";
import {
	CreateFullEvents,
	EventTypeStatus,
} from "../redux/types";
import ImageUpload from "../components/ImageUpload";
import { useState, useEffect } from "react";
import { postImage } from "../utils/blobStorageClient";
import { fetchVenues} from "../redux/venuesSlice";
import React from "react";
import RadioButton from "../components/RadioButton";
import CalendarItem from "../components/CalendarItem";
import TimePickerItem from "../components/TimeItem";
import "yup-phone";
import { createFullEvent } from "../redux/fullEventsSlice";
import { DateObject } from "react-multi-date-picker";

interface Values {
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
function CreateEventForm(): JSX.Element {
	const dispatch = useDispatch();
	const [image, setImage] = useState<File>();
	const [statusValue, setValueRadio] = React.useState(EventTypeStatus.HYBRID);
	const [calendarValue, setCalendarValue] = useState([new Date()]);
	const [timeValue, settimeValue] = useState(new DateObject());
	const [rangeOrMultipleValue, setrangeOrMultipleValue] = useState("true");
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
	useEffect(() => {
		dispatch(fetchVenues());
	}, [dispatch]);

	const handleSubmit = async (values: Values) => {
		let newImageUrl: string = "";
		if (image) {
			const setFile= new File([image],`${values.title}_${values.venueName}_${calendarValue[0].getDate()}_${calendarValue[0].getDay()}_${calendarValue[0].getMonth()}`);
			newImageUrl = await postImage(setFile);
		}
		values.type = statusValue;
		const newEvent: CreateFullEvents = {
			...values,
			status: 1,
			venueId: "",
			imageUrl: newImageUrl,
			areIndependent: rangeOrMultipleValue === "true",
			dates: calendarValue.map((date) => {
				return new Date(date.toString()).toISOString();
			}),
			time: timeValue.toDate().toISOString(),
		};
		await dispatch(createFullEvent(newEvent));
	};

	const initialValues: Values = {
		title: "",
		artist: "",
		venueId: "",
		price: 56,
		type: EventTypeStatus.LIVE,
		description: "",
		website: "",
		facebook: "",
		twitter: "",
		instagram: "",
		imageUrl: "",
		phone: "",
		venueName: "",
		address: "",
		venueWebsite: "",
		venueFacebook: "",
		venueTwitter: "",
		venueInstagram: "",
		venueDescription: "",
		locationType: "",
		locationCoordinates: [],
	};
	return (
		<div>
			<Text>Crea un nuevo evento!</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={CreateEventSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<ImageUpload
							fromChild={(local: File) => setImage(local)}
							alt={""}
						/>
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
										defaultChecked={true}
									/>
									<RadioButton
										id="Presencial"
										label="Presencial"
										name="statusValue"
										onChange={handleChange}
										value={EventTypeStatus.LIVE}
									/>
									<RadioButton
										id="Virtual"
										label="Virtual"
										name="statusValue"
										onChange={handleChange}
										value={EventTypeStatus.VIRTUAL}
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
export default CreateEventForm;
