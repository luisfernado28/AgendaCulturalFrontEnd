import { Box, CardMedia, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchEventById, singleEvent } from "../redux/EventSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import { castTypeOfEvent } from "../utils/utils";
function EventsDetail({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { Event } = useSelector(singleEvent);

	useEffect(() => {
		dispatch(fetchEventById(match.params.id));
	}, [dispatch, Event.id, match.params.id]);

	const listOfDates = Event.dates.map((inidividualDate) => {
		const newDate = new Date(inidividualDate);
		return (
			<Typography variant="h6" key={1}>
				{newDate.toDateString() + ", "}
			</Typography>
		);
	});

	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Titulo
				</Typography>
				{"  "}
				<Typography variant="h6">{Event.title}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Artista/Elenco:
				</Typography>
				<Typography variant="h6">{Event.artist}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Escenario:
				</Typography>
				<Typography variant="h6">
					{Boolean(Event.venueName)
						? Event.venueName
						: "sin escenario"}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Precio:
				</Typography>
				<Typography variant="h6">{Event.price + " Bs"}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Telefono:
				</Typography>
				<Typography variant="h6">{Event.phone}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Tipo de evento:
				</Typography>
				<Typography variant="h6">
					{castTypeOfEvent(Event.type)}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Fechas
				</Typography>
				{Event.areIndependent ? (
					listOfDates
				) : (
					<Typography variant="h6">
						{new Date(Event.dates[0]).toDateString()} a{" "}
						{new Date(Event.dates[1]).toDateString()}
					</Typography>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Horario:
				</Typography>
				<Typography variant="h6">{Event.time}</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" style={{ fontWeight: 600 }}>
					Direccion:
				</Typography>{" "}
				<Typography variant="h6">{Event.address}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "500px",
					}}
				>
					<Typography variant="h5" style={{ fontWeight: 600 }}>
						Descripcion:
					</Typography>{" "}
					<Typography variant="h6">{Event.description}</Typography>
				</Box>
			</Box>

			<Typography variant="h5" style={{ fontWeight: 600 }}>
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
						onClick={() => window.open(Event.facebook)}
					/>
				)}
				{Event.twitter === "" ? (
					<TwitterIcon color="disabled" />
				) : (
					<TwitterIcon
						sx={{
							color: "#1DA1F2",
						}}
						onClick={() => window.open(Event.twitter)}
					/>
				)}
				{Event.website === "" ? (
					<LanguageIcon color="disabled" />
				) : (
					<LanguageIcon
						sx={{
							color: "#000000",
						}}
						onClick={() => window.open(Event.website)}
					/>
				)}
				{Event.instagram === "" ? (
					<InstagramIcon color="disabled" />
				) : (
					<InstagramIcon
						sx={{
							color: "#E1306C",
						}}
						onClick={() => window.open(Event.instagram)}
					/>
				)}
			</Box>
			<Typography variant="h5" style={{ fontWeight: 600 }}>
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
						onClick={() => window.open(Event.venueFacebook)}
					/>
				)}
				{Event.venueTwitter === "" ? (
					<TwitterIcon color="disabled" />
				) : (
					<TwitterIcon
						sx={{
							color: "#1DA1F2",
						}}
						onClick={() => window.open(Event.venueTwitter)}
					/>
				)}
				{Event.venueWebsite === "" ? (
					<LanguageIcon color="disabled" />
				) : (
					<LanguageIcon
						sx={{
							color: "#000000",
						}}
						onClick={() => window.open(Event.venueWebsite)}
					/>
				)}
				{Event.venueInstagram === "" ? (
					<InstagramIcon color="disabled" />
				) : (
					<InstagramIcon
						sx={{
							color: "#E1306C",
						}}
						onClick={() => window.open(Event.venueInstagram)}
					/>
				)}
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
					<Box sx={{ height: "300px", width: "300px" }}>
						<CardMedia
							component="img"
							src={`${process.env.REACT_APP_Blob_API}/eventsimages/${Event.imageUrl}`}
						></CardMedia>
					</Box>
				</Box>
			)}
		</Fragment>
	);
}

export default EventsDetail;
