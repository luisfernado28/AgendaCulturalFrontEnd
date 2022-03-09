import { CardMedia } from "@mui/material";
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
			Titulo
			{fullEvent.title}
			Artista/Elenco:
			{fullEvent.artist}
			Escenario: {"\n"}
			{fullEvent.venueId.startsWith("-")
				? "sin escenario"
				: fullEvent.venueName}
			Precio: {"\n"}
			{fullEvent.price}
			Telefono: {"\n"}
			{fullEvent.phone}
			Tipo de evento: {"\n"}
			{fullEvent.type}
			Fechas
			{fullEvent.areIndependent ? (
				<div>{new Date(fullEvent.dates[0]).toDateString()}</div>
			) : (
				<div>
					{new Date(fullEvent.dates[0]).toDateString()}a
					{new Date(fullEvent.dates[1]).toDateString()}
				</div>
			)}
			Horario: {"\n"}
			{fullEvent.time}
			Description: {"\n"}
			{fullEvent.description}
			{fullEvent.imageUrl === "" ? (
				<div>No image</div>
			) : (
				<div>
					<CardMedia
						src={`${process.env.REACT_APP_Blob_API}/eventsimages/${fullEvent.imageUrl}`}
					></CardMedia>
				</div>
			)}
		</Fragment>
	);
}

export default EventsDetail;
