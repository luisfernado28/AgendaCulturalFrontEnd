/*
 * File: adminEventCard.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ShowModal from "./CustomModal";
import { Event, ModalTypes } from "../redux/types";
import { removeEvent } from "../redux/EventsSlice";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Box, Tooltip, Typography } from "@mui/material";
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
		window.location.reload();
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
							xs={7}
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
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={5}>
										<Typography
											variant="h6"
											align="left"
											style={{ fontWeight: 600 }}
										>
											Evento:
										</Typography>
									</Grid>
									<Grid item xs={7}>
										<Tooltip title={title}>
											<Typography
												variant="h6"
												align="left"
												noWrap
											>
												{title}
											</Typography>
										</Tooltip>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={5}>
										<Typography
											variant="h6"
											align="left"
											paragraph
											style={{ fontWeight: 600 }}
										>
											Artista/Elenco:
										</Typography>
									</Grid>
									<Grid item xs={7}>
										<Tooltip title={artist}>
											<Typography
												variant="h6"
												align="left"
												noWrap
											>
												{artist}
											</Typography>
										</Tooltip>
									</Grid>
								</Grid>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={5}>
										<Typography
											variant="h6"
											style={{ fontWeight: 600 }}
											align="left"
										>
											Escenario:
										</Typography>
									</Grid>
									<Grid item xs={7}>
										<Tooltip title={venueName}>
											<Typography
												variant="h6"
												align="left"
												noWrap
											>
												{venueName}
											</Typography>
										</Tooltip>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={5}>
										<Typography
											align="left"
											variant="h6"
											style={{ fontWeight: 600 }}
										>
											Fecha:
										</Typography>
									</Grid>
									<Grid item xs={7}>
										<Typography variant="h6" align="left">
											{startingDate.toLocaleString(
												"default",
												{
													month: "long",
												}
											) +
												"/" +
												(startingDate.getUTCDate())}
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid
							item
							xs={5}
							style={{
								display: "flex",
								justifyContent: "flex-start",
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
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											align="left"
											variant="h6"
											style={{ fontWeight: 600 }}
										>
											Precio:
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography align="left" variant="h6">
											{price} Bs.
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											align="left"
											variant="h6"
											style={{ fontWeight: 600 }}
										>
											Modalidad:
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography align="left" variant="h6">
											{typeOfEvent}
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											align="left"
											variant="h6"
											style={{ fontWeight: 600 }}
										>
											Hora:
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography align="left" variant="h6">
											{createTimeFormat(time)}
										</Typography>
									</Grid>
								</Grid>
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
								<EditIcon
									sx={{ fontSize: 40, color: "#39B3BA" }}
								/>
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
