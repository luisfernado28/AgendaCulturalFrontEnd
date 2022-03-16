import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullEvent } from "../redux/types";
import AdminEventCard from "../components/adminEventCard";
import { Link } from "react-router-dom";
import { fetchFullEvents, selectAllFullEvents } from "../redux/fullEventsSlice";
import { Button, Grid } from "@mui/material";

function AdminEventsList(): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvents } = useSelector(selectAllFullEvents);
	useEffect(() => {
		dispatch(fetchFullEvents({}));
	}, [dispatch]);
	const eventsList = fullEvents.map((event: FullEvent) => {
		return (
			<Grid item xs={12} rowSpacing={3} key={event.id}>
				<AdminEventCard
					title={event.title}
					artist={event.artist}
					venueId={event.venueId}
					status={event.status}
					price={event.price}
					id={event.id}
					phone={event.phone}
					type={event.type}
					description={event.description}
					website={event.website}
					facebook={event.facebook}
					twitter={event.twitter}
					instagram={event.instagram}
					dates={event.dates}
					imageUrl={event.imageUrl}
					areIndependent={event.areIndependent}
					time={event.time}
					tags={event.tags}
					venueName={event.venueName}
					address={event.address}
					venueWebsite={event.venueWebsite}
					venueFacebook={event.venueFacebook}
					venueTwitter={event.venueTwitter}
					venueInstagram={event.venueInstagram}
					venueDescription={event.venueDescription}
					locationType={event.locationType}
					locationCoordinates={event.locationCoordinates}
				/>
			</Grid>
		);
	});

	return (
		<div>
			Edita Eventos
			<Button color="inherit" href="/createEvent">Crear evento</Button>
			<Link to="/createVenue">Crear escenario</Link>
			<Grid
				container
				sx={{
					justifyContent: "stretch",
					my: "50px",
				}}
			>
				{eventsList}
			</Grid>
		</div>
	);
}
export default AdminEventsList;
