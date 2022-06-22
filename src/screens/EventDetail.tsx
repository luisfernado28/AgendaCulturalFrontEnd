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
	const { Event } = useSelector(singleEvent);
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
	// theme.typography.h3 = {
	// 	fontSize: "1.2rem",
	// 	"@media (min-width:600px)": {
	// 		fontSize: "1.5rem",
	// 	},
	// 	[theme.breakpoints.up("md")]: {
	// 		fontSize: "2rem",
	// 	},
	// };
	const listOfDates = Event.dates.map((inidividualDate) => {
		const newDate = new Date(inidividualDate);
		return (
			<Typography variant="h6" key={1}>
				{newDate.toDateString() + ", "}
			</Typography>
		);
	});
	return (
		<Box
			sx={{
				backgroundColor: "#ECEEFF",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				alignContent: "center",
			}}
		>
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						backgroundColor: "#FFFFFF",
						width: "800px",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						alignContent: "center",
						my: "20px",
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
				>
					<Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								//  matchesMinWidh600
								// 	? "flex-start"
								// 	: "center",
								alignItems: "center",
							}}
						>
							{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Titulo
							</Typography>
							{"  "} */}
							<Typography
								style={{
									fontWeight: 700,
									fontSize: 60,
								}}
								// variant="h3"
								//color="#1976d3"
							>
								{Event.title}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								//  matchesMinWidh600
								// 	? "flex-start"
								// 	: "center",
								alignItems: "center",
							}}
						>
							{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Artista/Elenco:
							</Typography> */}
							<Typography
								style={{
									fontWeight: 700,
									fontSize: 40,
								}}
								// variant="h3"
								//color="#1976d3"
							>
								{Event.artist}
							</Typography>
						</Box>
						{Event.imageUrl === "" ? (
							<div>No image</div>
						) : (
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Box sx={{ height: "500px", width: "500px" }}>
									<CardMedia
										component="img"
										src={`${process.env.REACT_APP_Blob_API}/eventsimages/${Event.imageUrl}`}
									></CardMedia>
								</Box>
							</Box>
						)}
						<Grid
							container
							spacing={2}
							direction="row"
							alignItems="flex-start"
							justifyContent="center"
						>
							<Grid item xs={12} sm={12} md={12} lg={6}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "flex-start",
										//backgroundColor: "#ECEEFF",
									}}
								>
									<AddLocationIcon fontSize={"large"} />
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											alignItems: "flex-start",
										}}
									>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 25,
											}}
										>
											Escenario
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{Event.venueName}
											{Event.address}
										</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={6}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "flex-start",
										//backgroundColor: "#ECEEFF",
									}}
								>
									<CalendarTodayIcon fontSize={"large"} />
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											alignItems: "flex-start",
											//backgroundColor: "#ECEEFF",
										}}
									>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 25,
											}}
										>
											Fechas y Horario
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{Event.areIndependent ? (
												listOfDates
											) : (
												<Typography
													sx={{
														fontWeight: 700,
														fontSize: 15,
													}}
													// variant="h4"
													//color="#1976d3"
												>
													{new Date(
														Event.dates[0]
													).toDateString()}{" "}
													a{" "}
													{new Date(
														Event.dates[1]
													).toDateString()}
												</Typography>
											)}
											{Event.time}
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{new Date(Event.time).getHours()}:
											{new Date(Event.time).getMinutes()}
										</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							direction="row"
							alignItems="flex-start"
							justifyContent="center"
							sx={{ my: "5px" }}
						>
							<Grid item xs={12} sm={12} md={12} lg={6}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "flex-start",
										//backgroundColor: "#ECEEFF",
									}}
								>
									<AttachMoneyIcon fontSize={"large"} />
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											alignItems: "flex-start",
										}}
									>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 25,
											}}
										>
											Precio
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{Event.venueName}
											{Event.address}
										</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={6}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "flex-start",
										//	backgroundColor: "#ECEEFF",
									}}
								>
									<CastleIcon fontSize={"large"} />
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											alignItems: "flex-start",
										}}
									>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 25,
											}}
										>
											Tipo de Evento
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{Event.areIndependent ? (
												listOfDates
											) : (
												<Typography
													sx={{
														fontWeight: 700,
														fontSize: 15,
													}}
													// variant="h4"
													//color="#1976d3"
												>
													{new Date(
														Event.dates[0]
													).toDateString()}{" "}
													a{" "}
													{new Date(
														Event.dates[1]
													).toDateString()}
												</Typography>
											)}
											{Event.time}
										</Typography>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 15,
											}}
										>
											{new Date(Event.time).getHours()}:
											{new Date(Event.time).getMinutes()}
										</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								//backgroundColor: "#ECEEFF",
								width: "200px",
							}}
						>
							<LocalPhoneIcon fontSize={"large"} />
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "flex-start",
									alignItems: "flex-start",
								}}
							>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 25,
									}}
								>
									Contacto
								</Typography>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 15,
									}}
								>
									{Event.phone}
								</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								width: "600px",
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
									fontSize: 15,
								}}
								paragraph={true}
								align="justify"
							>
								{Event.description}
							</Typography>
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
												window.open(
													Event.venueFacebook
												);
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
												window.open(
													Event.venueInstagram
												);
											}}
										/>
									)}
								</Box>
							</Grid>
						</Grid>

						{/* previous design */}
						<div>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									alignItems: "center",
								}}
							>
								{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Escenario:
							</Typography> */}
								<Typography
									style={{
										fontWeight: 700,
										fontSize: 34,
									}}
									// variant="h3"
									color="#1976d3"
								>
									{Boolean(Event.venueName)
										? Event.venueName
										: "sin escenario"}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									alignItems: "center",
								}}
							>
								{/* <Typography
								style={{ fontWeight: 700 }}
								variant="h4"
							>
								Tipo de evento:
							</Typography> */}
								<Typography
									style={{
										fontWeight: 700,
										fontSize: 34,
									}}
									// variant="h4"
									color="#1976d3"
								>
									{castTypeOfEvent(Event.type)}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									alignItems: "center",
								}}
							>
								{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Fechas
							</Typography> */}
								{Event.areIndependent ? (
									listOfDates
								) : (
									<Typography
										style={{
											fontWeight: 500,
											fontSize: 28,
										}}
										// variant="h4"
										color="#1976d3"
									>
										{new Date(
											Event.dates[0]
										).toDateString()}{" "}
										a{" "}
										{new Date(
											Event.dates[1]
										).toDateString()}
									</Typography>
								)}
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									alignItems: "center",
								}}
							>
								{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Telefono:
							</Typography> */}
								<Typography
									style={{
										fontWeight: 500,
										fontSize: 28,
									}}
									// variant="h4"
									color="#1976d3"
								>
									{Event.phone}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									alignItems: "center",
									width: "500px",
								}}
							>
								{/* <Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Descripcion:
								</Typography>{" "} */}
								<Typography
									// variant="h6"
									color="#1976d3"
									style={{
										fontWeight: 500,
										fontSize: 20,
									}}
									paragraph={true}
								>
									{Event.description}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									// flexDirection: "row",
									justifyContent: matchesMinWidh600
										? "flex-start"
										: "center",
									// alignItems: "center",
								}}
							>
								{/* <Typography
								variant="h5"
								style={{ fontWeight: 600 }}
							>
								Precio:
							</Typography> */}
								<Typography
									style={{
										fontWeight: 700,
										fontSize: 71,
									}}
									variant="body1"
									color="#1976d3"
								>
									{Event.price + " Bs"}
								</Typography>
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
													window.open(
														Event.instagram
													);
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
													window.open(
														Event.venueFacebook
													);
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
													window.open(
														Event.venueTwitter
													);
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
													window.open(
														Event.venueWebsite
													);
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
													window.open(
														Event.venueInstagram
													);
												}}
											/>
										)}
									</Box>
								</Grid>
							</Grid>
						</div>
					</Box>
				</Box>
			</ThemeProvider>
		</Box>
	);
}

export default EventsDetail;
