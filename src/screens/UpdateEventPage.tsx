import { useDispatch, useSelector } from "react-redux";
import { EventStatus, Status, EventTypeStatus } from "../redux/types";
import { useEffect, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PageSpinner from "../components/Spinner";
import UpdateEventForm2 from "../components/UpdateEventForm2";
import { fetchEventById, singleEvent } from "../redux/EventSlice";

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
	const dispatch = useDispatch();
	const { Event, eventStatus } = useSelector(singleEvent);

	useEffect(() => {
		dispatch(fetchEventById(match.params.id));
	}, [dispatch, match.params.id]);

	const typeEvent: any = EventTypeStatus[Event.type.toString()];
	return (
		<Fragment>
			{eventStatus === Status.IDLE ? (
				<div></div>
			) : eventStatus === Status.LOADING ? (
				<PageSpinner />
			) : eventStatus === Status.FAILED ? (
				<div>Failure Fetching Data</div>
			) : (
				<UpdateEventForm2
					title={Event.title}
					venueId={Event.venueId}
					type={typeEvent}
					dates={Event.dates}
					artist={Event.artist}
					price={Event.price}
					phone={Event.phone}
					description={Event.description}
					website={Event.website}
					facebook={Event.facebook}
					twitter={Event.twitter}
					instagram={Event.instagram}
					id={Event.id}
					status={Event.status}
					imageUrl={Event.imageUrl}
					areIndependent={Event.areIndependent}
					time={Event.time}
					tags={Event.tags}
					venueName={Event.venueName}
					address={Event.address}
					venueWebsite={Event.venueWebsite}
					venueFacebook={Event.venueFacebook}
					venueTwitter={Event.venueTwitter}
					venueInstagram={Event.venueInstagram}
					venueDescription={Event.venueDescription}
					locationType={Event.locationType}
					locationCoordinates={Event.locationCoordinates}
				/>
			)}
		</Fragment>
	);
}
export default withRouter(UpdateEventPage);
