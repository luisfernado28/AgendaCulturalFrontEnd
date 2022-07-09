import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { CreateEvents, EventTypeStatus } from "../redux/types";
import { useState } from "react";
import { postImage } from "../utils/blobStorageClient";
import React from "react";
import "yup-phone";
import { createEvent } from "../redux/EventsSlice";
import { DateObject } from "react-multi-date-picker";
import {
	Box,
	Button,
	Container,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CalendarItem from "../components/CalendarItem";
import TimePickerItem from "../components/TimeItem";
import ImageUpload from "../components/ImageUpload";
import createImageForBlob from "../utils/utils";
import Maps from "../components/Maps";

interface Values {
	title: string;
	artist: string;
	venueId: string;
	price: number;
	phone: string;
	type: string;
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
		.max(400, "El titulo no puede tener mas que 50 caracteres ")
		.required("Titulo del evento es requerido"),
	artist: Yup.string()
		.min(1, "Al menos un caracter")
		.max(400, "El artista no puede tener mas que 50 caracteres ")
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
	const [statusValue, setValueRadio] = React.useState(0); //EventTypeStatus.HYBRID);
	const [calendarValue, setCalendarValue] = useState([new Date()]);
	const [timeValue, settimeValue] = useState(new DateObject());
	const [rangeOrMultipleValue, setrangeOrMultipleValue] = useState(true);
	const handlerangeOrMultipleValue = (e: any) => {
		setrangeOrMultipleValue(e.target.value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValueRadio(parseInt((event.target as HTMLInputElement).value));
	};

	const handletimeChange = (e: DateObject) => {
		settimeValue(e);
	};

	const calendarOnChange = (e: any) => {
		setCalendarValue(e);
	};
	const [localizationData, setlocalizationData] = useState([]);
	const childToParent = (e: google.maps.LatLng) => {
		// console.log(e.lat());
		setlocalizationData([e.lat(), e.lng()]);
	};

	const handleSubmit = async (values: Values) => {
		let newImageUrl: string = "";
		if (image) {
			const setFile = createImageForBlob({
				image: image,
				title: values.title,
				venueName: values.venueName,
				calendarValue: calendarValue[0],
			});
			newImageUrl = await postImage(setFile);
		}
		values.type = statusValue.toString();
		console.log(localizationData);

		if (localizationData) {
			values.locationCoordinates = localizationData;
		}
		const newEvent: CreateEvents = {
			...values,
			status: "active",
			venueId: "",
			imageUrl: newImageUrl,
			areIndependent: rangeOrMultipleValue,
			dates: calendarValue.map((date) => {
				return new Date(date.toString()).toISOString();
			}),
			time: timeValue.toDate().toISOString(),
		};
		// console.log(newEvent);
		await dispatch(createEvent(newEvent));
	};

	const formik = useFormik({
		initialValues: {
			title: "",
			artist: "",
			price: 0,
			description: "",
			type: "0",
			venueId: "",
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
		},
		validationSchema: CreateEventSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<div>
			Crea un nuevo evento!
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						alignItems: "flex-end",
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
							backgroundColor: "#73C6FD",
							margin: "20px",
							height: "300px",
							width: "300px",
						}}
					>
						<ImageUpload
							fromChild={(local: File) => setImage(local)}
							alt={""}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
					}}
				>
					<Grid container spacing={2} sx={{ width: "800px" }}>
						<Grid item xs={12}>
							<Grid container direction={"row"} rowSpacing={3}>
								<Grid item xs={12}>
									<Typography variant="h4" component="div">
										Informacion del evento
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<TextField
										fullWidth
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
								<Grid item xs={12}>
									<TextField
										fullWidth
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
								<Grid item xs={12}>
									<TextField
										fullWidth
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
								<Grid item xs={12}>
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
										fullWidth
										multiline
										rows={10}
									/>
								</Grid>

								<Grid item xs={12}>
									<Typography
										sx={{
											fontWeight: 700,
											fontSize: 25,
										}}
									>
										Ubicacion del evento
									</Typography>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											maxWidth: "1000px",
										}}
									>
										<Maps
											markerCoordinates={[]}
											type={"Picker"}
											valueOfLocal={childToParent}
										/>
									</Box>
								</Grid>
								<Grid item xs={12}>
									Tipo de evento
								</Grid>
								<Grid
									xs={12}
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
								<Grid item xs={12}>
									{" "}
									Horario
								</Grid>
								<Grid item xs={12}>
									<TimePickerItem
										value={timeValue}
										onChange={handletimeChange}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							xs={12}
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
											onChange={
												handlerangeOrMultipleValue
											}
											defaultChecked={true}
											sx={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
												alignContent: "center",
											}}
										>
											<FormControlLabel
												value={true}
												control={<Radio />}
												label="Rango de fechas"
											/>
											<FormControlLabel
												value={false}
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
										fullWidth
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
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
										fullWidth
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
										fullWidth
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
										fullWidth
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
							xs={12}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							<Grid container direction={"column"} spacing={3}>
								<Grid item>
									<Typography variant="h4" component="div">
										Informacion de espacio
									</Typography>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
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
										fullWidth
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
										fullWidth
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
										fullWidth
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
										fullWidth
										id="venueInstagram"
										name="venueInstagram"
										label="Instagram de Espacio"
										value={formik.values.venueInstagram}
										onChange={formik.handleChange}
										error={
											formik.touched.venueInstagram &&
											Boolean(
												formik.errors.venueInstagram
											)
										}
										helperText={
											formik.touched.venueInstagram &&
											formik.errors.venueInstagram
										}
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
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
				</Box>
			</form>
		</div>
	);
}
export default CreateEventForm;
