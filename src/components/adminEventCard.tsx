/** @jsxRuntime classic */
/** @jsx jsx */
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Card, Text, jsx, Image, Grid, Button } from "theme-ui";
import ShowModal from "./CustomModal";

import { Dates, EventTypeStatus, ModalTypes, Status } from "../redux/types";
import { fetchVenueById, singleVenue } from "../redux/venueSlice";
import { removeEvent } from "../redux/eventsSlice";
import PageSpinner from "./Spinner";

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
	description,
	dates,
	venueId,
	type,
	venueName,
}: AdminProps): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();

	const { Venue, venueStatus } = useSelector(singleVenue);
	useEffect(() => {
		if (venueId !== "No Venue") {
			dispatch(fetchVenueById(venueId));
		}
		// console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ' + venueId);

		// console.log(Venue)
	}, [dispatch, venueId]);

	const handleDelete = (id: string) => {
		dispatch(removeEvent(id));
		ShowModal({
			onSuccess: () => {
				history.push("/adminEvents");
			},
			type: ModalTypes.DeleteSucceededModalValues,
		});
	};

	const startingDate = new Date(dates.dates[0]);
	const time = new Date(dates.time);
	const typeOfEvent =
		type.toString() === "0"
			? "Hibrido"
			: type.toString() === "1"
			? "Presencial"
			: "Virtual";
	if (venueStatus === Status.IDLE) {
		return <div></div>;
	} else if (venueStatus === Status.LOADING) {
		return <PageSpinner />;
	} else if (venueStatus === Status.FAILED) {
		return <Text>Failure Fetching Data</Text>;
	} else {
		return (
			<Card
				variant="primary"
				sx={{
					width: "1500px",
					height: "350px",
				}}
			>
				<Text>{title} </Text>
				<Grid
					columns={[2]}
					sx={{
						justifyContent: "stretch",
						my: "50px",
						rowGap: "100px",
						columnGap: "50px",
					}}
				>
					<Grid
						columns={[2]}
						sx={{
							justifyContent: "stretch",
							my: "50px",
							rowGap: "100px",
							columnGap: "50px",
						}}
					>
						<div>
							Artista/Elenco:
							<Text>{artist}</Text>
							<br />
							Escenario:
							<Text>{Venue.name}</Text>
							<br />
							Fecha:
							<Text>
								{startingDate.toLocaleString("default", {
									month: "long",
								}) +
									"/" +
									startingDate.getDay()}
							</Text>
						</div>
						<div>
							Precio:
							<Text>{price}</Text>
							<br />
							Tipo de evento:
							<Text>{typeOfEvent}</Text>
							<br />
							Hora:
							<Text>{time.toTimeString()}</Text>
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
								<Text>No image</Text>
							) : (
								<div>
									<Image
										src={`${process.env.REACT_APP_Blob_API}${imageUrl}`}
										variant="card"
									></Image>
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
}

export default AdminEventCard;
