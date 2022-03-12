import { CardMedia, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchFullEventById, singleFullEvent } from "../redux/fullEventSlice";

function EventsDetail({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvent } = useSelector(singleFullEvent);

	useEffect(() => {
		dispatch(fetchFullEventById(match.params.id));
	}, [dispatch, fullEvent.id, match.params.id]);

	return (
		<Fragment>
			<Typography variant="h4">Titulo</Typography>
			<Typography variant="body1">{fullEvent.title}</Typography>
			<Typography variant="h4">Artista/Elenco:</Typography>
			<Typography variant="body1">{fullEvent.artist}</Typography>
			<Typography variant="h4">Escenario:</Typography>
			<Typography variant="body1">
				{fullEvent.venueId.startsWith("-")
					? "sin escenario"
					: fullEvent.venueName}
			</Typography>
			<Typography variant="h4">Precio:</Typography>
			<Typography variant="body1">{"Bs: " + fullEvent.price}</Typography>
			<Typography variant="h4">Telefono:</Typography>
			<Typography variant="body1">{fullEvent.phone}</Typography>
			<Typography variant="h4">Tipo de evento:</Typography>
			<Typography variant="body1">{fullEvent.type}</Typography>
			<Typography variant="h4">Fechas</Typography>
			<Typography variant="body1">
				{!fullEvent.areIndependent ? (
					<div>{new Date(fullEvent.dates[0]).toDateString()}</div>
				) : (
					<div>
						{new Date(fullEvent.dates[0]).toDateString()} a
						{new Date(fullEvent.dates[1]).toDateString()}
					</div>
				)}
			</Typography>
			<Typography variant="h4">Horario:</Typography>
			<Typography variant="body1">{fullEvent.time}</Typography>
			<Typography variant="h4">Description:</Typography>{" "}
			<Typography variant="body1">{fullEvent.description}</Typography>
			{fullEvent.imageUrl === "" ? (
				<div>No image</div>
			) : (
				<div>
					<CardMedia
						component="img"
						src={`${process.env.REACT_APP_Blob_API}/eventsimages/${fullEvent.imageUrl}`}
					></CardMedia>
				</div>
			)}
		</Fragment>
	);
}

export default EventsDetail;
