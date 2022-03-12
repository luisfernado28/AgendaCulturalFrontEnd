import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ShowModal from "./CustomModal";

import {
	Dates,
	EventTypeStatus,
	FullEvent,
	ModalTypes,
} from "../redux/types";
import { removeFullEvent } from "../redux/fullEventsSlice";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";

interface AdminProps {
	title: string;
	artist: string;
	venueId: string;
	status: number;
	price: number;
	id: string;
	phone: string;
	type: EventTypeStatus;
	description: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	imageUrl?: string;
	dates: Dates;
	tagsId?: string[];
	time?: string;
	venueName?: string;
}

function AdminEventCard({
	id,
	title,
	artist,
	imageUrl,
	price,
	dates,
	type,
	venueName,
	time,
}: FullEvent): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleDelete = (id: string) => {
		dispatch(removeFullEvent(id));
		ShowModal({
			onSuccess: () => {
				history.push("/adminEvents");
			},
			type: ModalTypes.DeleteSucceededModalValues,
		});
	};

	const startingDate = new Date(dates[0]);
	const eventTime = new Date(time);
	const typeOfEvent =
		type.toString() === "0"
			? "Hibrido"
			: type.toString() === "1"
			? "Presencial"
			: "Virtual";

	return (
		<Card  sx={{ Width: 800, Height: 300 }} variant="outlined">
			<Typography variant="h4">{title}</Typography> 
			<Grid 
				xs={6}
				sx={{
					justifyContent: "stretch",
					my: "50px",
					rowGap: "100px",
					columnGap: "50px",
				}}
			>
				<Grid
					xs={6}
					sx={{
						justifyContent: "stretch",
						my: "50px",
						rowGap: "100px",
						columnGap: "50px",
					}}
				>
					<div>
						Artista/Elenco:
						{artist}
						<br />
						Escenario:
						{venueName}
						<br />
						Fecha:
							{startingDate.toLocaleString("default", {
								month: "long",
							}) +
								"/" +
								startingDate.getDay()}
						
					</div>
					<div>
						Precio:
						{price}
						<br />
						Tipo de evento:
						{typeOfEvent}
						<br />
						Hora:
						{eventTime.toTimeString()}
					</div>
				</Grid>
				<Grid
					columns={[3]}
					sx={{
						justifyContent: "stretch",
						my: "50px",
						rowGap: "100px",
						columnGap: "50px",
					}}
				>
					<div>
						{imageUrl === "" ? (
							<div>No image</div>
						) : (
							<div>
								<CardMedia 
									src={`${process.env.REACT_APP_Blob_API}/eventsimages/${imageUrl}`}
								></CardMedia>
							</div>
						)}
					</div>
					<div>
						<Link to={`/updateEvent/${id}`}>
							<FontAwesomeIcon icon={faEdit} />
						</Link>
					</div>
					<div>
						<Button
							onClick={() =>
								ShowModal({
									type: ModalTypes.ConfirmDeleteModalValues,
									onSuccess: () => handleDelete(id),
								})
							}
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</div>
				</Grid>
			</Grid>
		</Card>
	);
}

export default AdminEventCard;
