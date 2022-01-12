/** @jsxImportSource theme-ui */
import { Grid, Text } from "theme-ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, selectAllEvents } from "../redux/eventsSlice";
import { Event } from "../redux/types";
import AdminEventCard from "../components/adminEventCard";
import { Link } from "react-router-dom";

function AdminEventsList(): JSX.Element {
	const dispatch = useDispatch();
	const { events } = useSelector(selectAllEvents);
	//const { Venue, venueStatus } = useSelector(singleVenue)

	useEffect(() => {
		dispatch(fetchEvents());
	}, [dispatch]);
	const eventsList = events.map((event: Event) => {
		if (event.venueId !== "No Venue") {
		}
		// console.log(event.venueId)
		// if (event.venueId !== '--Select--') {
		//
		//     if (venueStatus === Status.IDLE) {
		//         <div></div>
		//     } else if (venueStatus === Status.LOADING) {
		//         < PageSpinner />
		//     } else if (venueStatus === Status.FAILED) {
		//         <Text>Failure Fetching Data</Text>
		//     } else {
		//         return (
		//             <div key={event.id} >
		//                 <AdminEventCard
		//                     title={event.title}
		//                     artist={event.artist}
		//                     venueId={event.venueId}
		//                     status={event.status}
		//                     price={event.price}
		//                     id={event.id}
		//                     phone={event.phone}
		//                     type={1}
		//                     description={event.description}
		//                     website={event.website}
		//                     facebook={event.facebook}
		//                     twitter={event.twitter}
		//                     instagram={event.instagram}
		//                     dates={event.dates}
		//                     venueName={Venue.name}
		//                 />
		//             </div>
		//         )
		//     }
		// }
		return (
			<div key={event.id}>
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
				/>
			</div>
		);
	});

	return (
		<div>
			<Text>Edita Eventos</Text>
			<Link to="/createEvent">Crear evento</Link>
			<Link to="/createVenue">Crear escenario</Link>
			<Grid
				columns={[1]}
				sx={{
					justifyContent: "stretch",
					my: "50px",
					rowGap: "100px",
					columnGap: "50px",
				}}
			>
				{eventsList}
			</Grid>
		</div>
	);
}
export default AdminEventsList;
