import { CardMedia, Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FullEvent } from "../redux/types";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
function EventCard({
	id,
	title,
	imageUrl,
	price,
	dates,
	venueName,
	time,
	artist
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
		<Card
			sx={{ height: "100%", display: "flex", flexDirection: "column" }}
			variant="outlined"
		>
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
					// <Link to={`/events/${id}`}>No image go to event</Link>
					<Link to={`/events/${id}`}>
						<CardMedia
							component="img"
							height="240"
							image={`${process.env.REACT_APP_Blob_API}/eventsimages/noImage.jpg`}
						></CardMedia>
					</Link>
				)}
			</div>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant="h5" component="h2">
					{title} por {artist}
				</Typography>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>
					{venueName === "" ? (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							<AddLocationIcon />
							<div>Virtual</div>
						</Box>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							<AddLocationIcon />
							{venueName}
						</Box>
					)}
				</Typography>
				<Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}
					>
						<CalendarTodayOutlinedIcon />
						Fecha:
						{fromToCardDate}
						{"   "}
						<AccessTimeOutlinedIcon />
						Hora:
						{new Date(time).getHours() +
							":" +
							new Date(time).getMinutes()}
					</Box>
				</Typography>
			</CardContent>
			{/* <div>
				{frontCardDate}
				{venueName === "" ? (
					<div>Venue: Sin evento</div>
				) : (
					<div>Venue:{venueName}</div>
				)}
				<br />
				
				<br />
				Time{" "}
				{new Date(time).getHours() + ":" + new Date(time).getMinutes()}
				<br />
				Precio:{price}
				<br />
			</div> */}
		</Card>
	);
}

export default EventCard;
