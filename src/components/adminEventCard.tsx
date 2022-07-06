import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ShowModal from "./CustomModal";
import { Event, ModalTypes } from "../redux/types";
import { removeEvent } from "../redux/EventsSlice";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTimeFormat } from "../utils/utils";

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
}: Event): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleDelete = (id: string) => {
		dispatch(removeEvent(id));
		ShowModal({
			onSuccess: () => {
				history.push("/adminEvents");
				window.location.reload();
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
				<Grid
					item
					xs={6}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
					}}
				>
					<Grid container>
						<Grid
							item
							xs={6}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Evento:
								</Typography>
								<Typography variant="h6">{title}</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Artista/Elenco:
								</Typography>
								<Typography variant="h6">{artist}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Escenario:
								</Typography>
								<Typography variant="h6">
									{venueName}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Fecha:
								</Typography>
								<Typography variant="h6">
									{startingDate.toLocaleString("default", {
										month: "long",
									}) +
										"/" +
										startingDate.getDay()}
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={6}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Precio:
								</Typography>
								<Typography variant="h6">{price}</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Tipo de evento:
								</Typography>
								<Typography variant="h6">
									{typeOfEvent}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
								}}
							>
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									Hora:
								</Typography>
								<Typography variant="h6">
									{createTimeFormat(time)}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={6}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
					}}
				>
					<Grid container>
						<Grid item xs={4}>
							{imageUrl === "" ? (
								<Typography
									variant="h5"
									style={{ fontWeight: 600 }}
								>
									No image
								</Typography>
							) : (
								<div>
									<CardMedia
										component="img"
										height={"200px"}
										width={"200px"}
										src={`${process.env.REACT_APP_Blob_API}/eventsimages/${imageUrl}`}
									></CardMedia>
								</div>
							)}
						</Grid>
						<Grid
							item
							xs={4}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							<Link to={`/updateEvent/${id}`}>
								<EditIcon sx={{ fontSize: 40 }} />
							</Link>
						</Grid>
						<Grid
							item
							xs={4}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							<Button
								onClick={() =>
									ShowModal({
										type: ModalTypes.ConfirmDeleteModalValues,
										onSuccess: () => handleDelete(id),
									})
								}
							>
								<DeleteForeverIcon sx={{ fontSize: 40 }} />
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}

export default AdminEventCard;
