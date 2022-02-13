import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Text, Image } from "theme-ui";
import { fetchFullEventById, singleFullEvent } from "../redux/fullEventSlice";

function EventsDetail({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvent} = useSelector(singleFullEvent);
	
	useEffect(() => {
		dispatch(fetchFullEventById(match.params.id));	
	}, [dispatch, fullEvent.id, match.params.id]);
	
	return (
		<Fragment>
			Titulo
			<Text>{fullEvent.title}</Text>
			Artista/Elenco:
			<Text>{fullEvent.artist}</Text>
			<Text>
				Escenario: {"\n"}
				{fullEvent.venueId.startsWith("-") ? "sin escenario" : fullEvent.venueName}
			</Text>
			<Text>
				Precio: {"\n"}
				{fullEvent.price}
			</Text>
			<Text>
				Telefono: {"\n"}
				{fullEvent.phone}
			</Text>
			<Text>
				Tipo de evento: {"\n"}
				{fullEvent.type}
			</Text>
			Fechas
			{fullEvent.areIndependent ? (
				<Text>{new Date(fullEvent.dates[0]).toDateString()}</Text>
			) : (
				<Text>
					{new Date(fullEvent.dates[0]).toDateString()}a
					{new Date(fullEvent.dates[1]).toDateString()}
				</Text>
			)}
			<Text>
				Horario: {"\n"}
				{fullEvent.time}
			</Text>
			<Text>
				Description: {"\n"}
				{fullEvent.description}
			</Text>
			{fullEvent.imageUrl === "" ? (
				<Text>No image</Text>
			) : (
				<div>
					<Image
						src={`${process.env.REACT_APP_Blob_API}${fullEvent.imageUrl}`}
						variant="card"
					></Image>
				</div>
			)}
		</Fragment>
	);
}

export default EventsDetail;
