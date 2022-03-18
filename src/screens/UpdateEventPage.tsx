import { useDispatch, useSelector } from "react-redux";
import { EventStatus, Status, EventTypeStatus } from "../redux/types";
import { useEffect, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PageSpinner from "../components/Spinner";
import UpdateEventForm2 from "../components/UpdateEventForm2";
import { fetchFullEventById, singleFullEvent } from "../redux/fullEventSlice";

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
	const { fullEvent, eventStatus } = useSelector(singleFullEvent);

	useEffect(() => {
		dispatch(fetchFullEventById(match.params.id));
	}, [dispatch, match.params.id]);

	const typeEvent: any = EventTypeStatus[fullEvent.type.toString()];
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
					title={fullEvent.title}
					venueId={fullEvent.venueId}
					type={typeEvent}
					dates={fullEvent.dates}
					artist={fullEvent.artist}
					price={fullEvent.price}
					phone={fullEvent.phone}
					description={fullEvent.description}
					website={fullEvent.website}
					facebook={fullEvent.facebook}
					twitter={fullEvent.twitter}
					instagram={fullEvent.instagram}
					id={fullEvent.id}
					status={fullEvent.status}
					imageUrl={fullEvent.imageUrl}
					areIndependent={fullEvent.areIndependent}
					time={fullEvent.time}
					tags={fullEvent.tags}
					venueName={fullEvent.venueName}
					address={fullEvent.address}
					venueWebsite={fullEvent.venueWebsite}
					venueFacebook={fullEvent.venueFacebook}
					venueTwitter={fullEvent.venueTwitter}
					venueInstagram={fullEvent.venueInstagram}
					venueDescription={fullEvent.venueDescription}
					locationType={fullEvent.locationType}
					locationCoordinates={fullEvent.locationCoordinates}
				/>
			)}
		</Fragment>
	);
}
export default withRouter(UpdateEventPage);