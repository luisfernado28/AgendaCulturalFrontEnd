import { Box, CardMedia, Link, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchFullEventById, singleFullEvent } from "../redux/fullEventSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import { castTypeOfEvent } from "../utils/utils";
function EventsDetail({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvent } = useSelector(singleFullEvent);

	useEffect(() => {
		dispatch(fetchFullEventById(match.params.id));
	}, [dispatch, fullEvent.id, match.params.id]);

	const listOfDates = fullEvent.dates.map((inidividualDate) => {
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
				<Typography variant="h6">{fullEvent.title}</Typography>
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
				<Typography variant="h6">{fullEvent.artist}</Typography>
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
					{Boolean(fullEvent.venueName)
						? fullEvent.venueName
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
				<Typography variant="h6">{fullEvent.price + " Bs"}</Typography>
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
				<Typography variant="h6">{fullEvent.phone}</Typography>
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
					{castTypeOfEvent(fullEvent.type)}
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
				{fullEvent.areIndependent ? (
					listOfDates
				) : (
					<Typography variant="h6">
						{new Date(fullEvent.dates[0]).toDateString()} a{" "}
						{new Date(fullEvent.dates[1]).toDateString()}
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
				<Typography variant="h6">{fullEvent.time}</Typography>
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
				<Typography variant="h6">{fullEvent.address}</Typography>
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
					<Typography variant="h6">
						{fullEvent.description}
					</Typography>
				</Box>
			</Box>

			<Typography variant="h5" style={{ fontWeight: 600 }}>
				Redes sociales del evento
			</Typography>
			<Box>
				<Link
					href={fullEvent.facebook}
					underline="none"
					target="_blank"
				>
					<FacebookIcon />
				</Link>

				<Link href={fullEvent.twitter} underline="none" target="_blank">
					<TwitterIcon />
				</Link>
				<Link href={fullEvent.website} underline="none" target="_blank">
					<LanguageIcon />
				</Link>
				<Link
					href={fullEvent.instagram}
					underline="none"
					target="_blank"
				>
					<InstagramIcon />
				</Link>
			</Box>
			<Typography variant="h5" style={{ fontWeight: 600 }}>
				Redes sociales del espacio
			</Typography>
			<Box>
				<Link
					href={fullEvent.venueFacebook}
					underline="none"
					target="_blank"
				>
					<FacebookIcon />
				</Link>

				<Link
					href={fullEvent.venueTwitter}
					underline="none"
					target="_blank"
				>
					<TwitterIcon />
				</Link>
				<Link
					href={fullEvent.venueWebsite}
					underline="none"
					target="_blank"
				>
					<LanguageIcon />
				</Link>
				<Link
					href={fullEvent.venueInstagram}
					underline="none"
					target="_blank"
				>
					<InstagramIcon />
				</Link>
			</Box>
			{fullEvent.imageUrl === "" ? (
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
							src={`${process.env.REACT_APP_Blob_API}/eventsimages/${fullEvent.imageUrl}`}
						></CardMedia>
					</Box>
				</Box>
			)}
		</Fragment>
	);
}

export default EventsDetail;
