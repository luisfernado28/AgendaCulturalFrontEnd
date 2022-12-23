/*
 * File: EventDetail.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import {
	Box,
	CardMedia,
	createTheme,
	Grid,
	responsiveFontSizes,
	ThemeProvider,
	useMediaQuery,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchEventById, singleEvent } from "../redux/EventSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReactGA from "react-ga4";
import { castTypeOfEvent } from "../utils/utils";
import { orange } from "@mui/material/colors";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CastleIcon from "@mui/icons-material/Castle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EventInfoBox from "../components/eventInfoBox";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./../styles/screens/EventDetail.css";
import Maps from "../components/Maps";
import PageSpinner from "../components/Spinner";
import { Status } from "../redux/types";

declare module "@mui/material/styles" {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}
function EventsDetail({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { Event, eventStatus } = useSelector(singleEvent);
	const matchesMinWidh600 = useMediaQuery("(min-width:600px)");
	useEffect(() => {
		dispatch(fetchEventById(match.params.id));
	}, [dispatch, Event.id, match.params.id]);

	useEffect(() => {
		//This will not be excuted on the first time the use come to this page
		ReactGA.event("page_view", {
			category: "Evento cultural individual",
			action: Event.title,
			page_title: Event.title,
		});
	}, []);
	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	if (eventStatus === Status.LOADING) return <PageSpinner />;

	return (
		<Box className="backGroundFiller">
			<ThemeProvider theme={theme}>
				<Box className="eventCardFiller">
					<Box className="titleBox">
						<Typography
							style={{
								fontWeight: 700,
								fontSize: matchesMinWidh600 ? 40 : 25,
							}}
						>
							{Event.title}
						</Typography>
					</Box>

					<Box className="titleBox">
						<Typography
							style={{
								fontWeight: 500,
								fontSize: matchesMinWidh600 ? 35 : 25,
							}}
						>
							{Event.artist}
						</Typography>
					</Box>
					<Box className="imageBox">
						{Event.imageUrl === "" ? (
							<div>No image</div>
						) : (
							<CardMedia
								component="img"
								src={`${process.env.REACT_APP_Blob_API}/eventsimages/${Event.imageUrl}`}
							></CardMedia>
						)}
					</Box>
					<Grid
						container
						spacing={0}
						direction="row"
						alignItems="flex-start"
						justifyContent="center"
						sx={{ marginTop: "10px" }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={
									<AddLocationIcon fontSize={"large"} />
								}
								content={
									Event.address + " / " + Event.venueName
								}
								title={"Escenario"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={
									<CalendarTodayIcon fontSize={"large"} />
								}
								content={Event.areIndependent}
								title={"Fechas"}
								datesArray={Event.dates}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={0}
						direction="row"
						alignItems="flex-start"
						justifyContent="center"
						sx={{ marginTop: "0px", marginBottom: "10px" }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={
									<AttachMoneyIcon fontSize={"large"} />
								}
								content={Event.price}
								title={"Precio"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={<CastleIcon fontSize={"large"} />}
								content={castTypeOfEvent(Event.type)}
								title={"Tipo de Evento"}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						direction="row"
						alignItems="flex-start"
						justifyContent="flex-start"
						sx={{ marginBottom: "10px" }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={
									<LocalPhoneIcon fontSize={"large"} />
								}
								content={Event.phone}
								title={"Contacto"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<EventInfoBox
								statusImage={
									<AccessTimeIcon fontSize={"large"} />
								}
								content={Event.time}
								title={"Horario"}
							/>
						</Grid>
					</Grid>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							maxWidth: "550px",
						}}
					>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: 25,
							}}
						>
							Descripcion del evento
						</Typography>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: matchesMinWidh600 ? 15 : 18,
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
							paragraph={true}
							align="justify"
						>
							{Event.description}
						</Typography>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: 25,
							}}
						>
							Ubicacion del evento
						</Typography>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							maxWidth: "300px",
							marginBottom: "10px",
						}}
					>
						<Maps
							markerCoordinates={Event.locationCoordinates}
							type={"Informative"}
							valueOfLocal={undefined}
						/>
					</Box>

					<Grid
						container
						spacing={2}
						direction="row"
						alignItems="center"
						justifyContent="center"
						width={"100%"}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Typography
								variant="h5"
								style={{ fontWeight: 700 }}
								color="#1976d3"
							>
								Redes sociales del evento
							</Typography>
							<Box>
								{Event.facebook === "" ? (
									<FacebookIcon color="disabled" />
								) : (
									<FacebookIcon
										sx={{
											color: "#1877F2",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Facebook del evento: " +
													Event.title,
											});
											window.open(Event.facebook);
										}}
									/>
								)}
								{Event.twitter === "" ? (
									<TwitterIcon color="disabled" />
								) : (
									<TwitterIcon
										sx={{
											color: "#1DA1F2",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Twitter del evento: " +
													Event.title,
											});
											window.open(Event.twitter);
										}}
									/>
								)}
								{Event.website === "" ? (
									<LanguageIcon color="disabled" />
								) : (
									<LanguageIcon
										sx={{
											color: "#000000",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de web del evento: " +
													Event.title,
											});
											window.open(Event.website);
										}}
									/>
								)}
								{Event.instagram === "" ? (
									<InstagramIcon color="disabled" />
								) : (
									<InstagramIcon
										sx={{
											color: "#E1306C",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Instagram del evento: " +
													Event.title,
											});
											window.open(Event.instagram);
										}}
									/>
								)}
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Typography
								variant="h5"
								color="#1976d3"
								style={{ fontWeight: 700 }}
							>
								Redes sociales del espacio
							</Typography>
							<Box>
								{Event.venueFacebook === "" ? (
									<FacebookIcon color="disabled" />
								) : (
									<FacebookIcon
										sx={{
											color: "#1877F2",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Facebook del espacio: " +
													Event.title,
											});
											window.open(Event.venueFacebook);
										}}
									/>
								)}
								{Event.venueTwitter === "" ? (
									<TwitterIcon color="disabled" />
								) : (
									<TwitterIcon
										sx={{
											color: "#1DA1F2",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Twitter del espacio: " +
													Event.title,
											});
											window.open(Event.venueTwitter);
										}}
									/>
								)}
								{Event.venueWebsite === "" ? (
									<LanguageIcon color="disabled" />
								) : (
									<LanguageIcon
										sx={{
											color: "#000000",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de web del espacio: " +
													Event.title,
											});
											window.open(Event.venueWebsite);
										}}
									/>
								)}
								{Event.venueInstagram === "" ? (
									<InstagramIcon color="disabled" />
								) : (
									<InstagramIcon
										sx={{
											color: "#E1306C",
										}}
										onClick={() => {
											ReactGA.event({
												category:
													"Evento cultural individual",
												action:
													"Pagina de Instagram del espacio: " +
													Event.title,
											});
											window.open(Event.venueInstagram);
										}}
									/>
								)}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</ThemeProvider>
		</Box>
	);
}

export default EventsDetail;
