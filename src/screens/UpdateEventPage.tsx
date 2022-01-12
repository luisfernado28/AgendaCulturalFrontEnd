/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { EventStatus, Status, EventTypeStatus } from "../redux/types";
import { useEffect, Fragment } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { fetchEventById, singleEvent } from "../redux/eventSlice";
import PageSpinner from "../components/Spinner";
import UpdateEventForm2 from "../components/UpdateEventForm2";
import { authUsers } from "../redux/authSlice";

export interface Values {
	title: string;
	artist: string;
	venueId: string;
	// status: number,
	price: number;
	phone: string;
	type: EventStatus;
	description: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	imageUrl?: string;
	// tagsId?: string[],
}

function UpdateEventPage({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	console.log(match);
	const dispatch = useDispatch();
	const { event, eventStatus } = useSelector(singleEvent);

	useEffect(() => {
		dispatch(fetchEventById(match.params.id));
	}, [dispatch, match.params.id]);


	const typeEvent: EventTypeStatus = EventTypeStatus[event.type.toString()];
	return (
		<Fragment>
			{eventStatus === Status.IDLE ? (
				<div></div>
			) : eventStatus === Status.LOADING ? (
				<PageSpinner />
			) : eventStatus === Status.FAILED ? (
				<Text>Failure Fetching Data</Text>
			) : (
				<UpdateEventForm2
					title={event.title}
					venueId={event.venueId}
					type={typeEvent}
					dates={event.dates}
					event={event}
					artist={event.artist}
					price={event.price}
					phone={event.phone}
					description={event.description}
					website={event.website}
					facebook={event.facebook}
					twitter={event.twitter}
					instagram={event.instagram}
				/>
			)}
		</Fragment>
	);
}
export default withRouter(UpdateEventPage);
