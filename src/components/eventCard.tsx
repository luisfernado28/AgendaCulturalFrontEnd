import { CardMedia, Card } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FullEvent } from "../redux/types";

function EventCard({
	id,
	title,
	imageUrl,
	price,
	dates,
	venueName,
	time,
}: FullEvent): JSX.Element {
	const frontCardDate =
		new Date(dates[0]).getDay() +
		"/" +
		new Date(dates[0]).toLocaleString("default", { month: "short" }); //+ '/' + dateOfEvent.getFullYear();
	const fromToCardDate = setDatesRange();
	const dispatch = useDispatch();

	useEffect(() => {}, [dispatch]);
	function setDatesRange(): string {
		const first = new Date(dates[0]);
		if (dates.length === 1) {
			return (
				first.getDay() +
				" de " +
				first.toLocaleString("default", { month: "long" })
			);
		} else {
			const last = new Date(dates[dates.length - 1]);
			const string =
				"Desde " +
				first.getDay() +
				" de " +
				first.toLocaleString("default", { month: "long" }) +
				" hasta el " +
				last.getDay() +
				" de " +
				last.toLocaleString("default", { month: "long" });
			return string;
		}
	}
	return (
		<Card sx={{ Width: 275, Height: 300 }} variant="outlined">
			<div>
				{imageUrl ? (
					<Link to={`/events/${id}`}>
						<CardMedia
							component="img"
							height="240"
							image={`${process.env.REACT_APP_Blob_API}/eventsimages/${imageUrl}`}
						></CardMedia>
					</Link>
				) : (
					<Link to={`/events/${id}`}>No image go to event</Link>
				)}
			</div>
			<div>
				{frontCardDate}
				{title}
				{venueName === "" ? (
					<div>Venue: Sin evento</div>
				) : (
					<div>Venue:{venueName}</div>
				)}
				<br />
				Dates:{fromToCardDate}
				<br />
				Time{" "}
				{new Date(time).getHours() + ":" + new Date(time).getMinutes()}
				<br />
				Precio:{price}
				<br />
			</div>
		</Card>
	);
}

export default EventCard;
