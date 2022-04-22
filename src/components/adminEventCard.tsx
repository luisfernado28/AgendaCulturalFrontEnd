import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ShowModal from "./CustomModal";
import { Dates, EventTypeStatus, FullEvent, ModalTypes } from "../redux/types";
import { removeFullEvent } from "../redux/fullEventsSlice";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
		<Card sx={{ Width: 800, Height: 300 }} variant="outlined">
			<Grid container>
				<Grid item xs={6}>
					<Grid container>
						<Grid item xs={6}>
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
						</Grid>
						<Grid item xs={6}>
							Precio:
							{price}
							<br />
							Tipo de evento:
							{typeOfEvent}
							<br />
							Hora:
							{eventTime.toTimeString()}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Grid container>
						<Grid item xs={4}>
							{imageUrl === "" ? (
								<div>No image</div>
							) : (
								<div>
									<CardMedia
										component="img"
										src={`${process.env.REACT_APP_Blob_API}/eventsimages/${imageUrl}`}
									></CardMedia>
								</div>
							)}
						</Grid>
						<Grid item xs={4}>
							<Link to={`/updateEvent/${id}`}>
								<EditIcon/>
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Button
								onClick={() =>
									ShowModal({
										type: ModalTypes.ConfirmDeleteModalValues,
										onSuccess: () => handleDelete(id),
									})
								}
							>
								<DeleteForeverIcon/>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}

export default AdminEventCard;
