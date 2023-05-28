/*
 * File: eventCard.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import {
	CardMedia,
	Card,
	CardContent,
	Typography,
	Box,
	Tooltip,
	Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Event } from "../redux/types";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { createTimeFormat } from "../utils/utils";

function EventCard({
	id,
	title,
	imageUrl,
	price,
	dates,
	venueName,
	time,
	artist,
}: Event): JSX.Element {
	const fromToCardDate = setDatesRange();
	const dispatch = useDispatch();

	useEffect(() => {}, [dispatch]);
	function setDatesRange(): string {
		const first = new Date(dates[0]);
		let month = first.toLocaleString("default", { month: "short" });
		month = month.charAt(0).toUpperCase() + month.slice(1);
		return (first.getUTCDate()-1) + "/" + month;
	}
	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
				<Box
					sx={{
						height: "70px",
					}}
				>
					<Tooltip title={title}>
						<Typography
							gutterBottom
							align="center"
							variant="h5"
							sx={{
								display: "-webkit-box",
								overflow: "hidden",
								WebkitBoxOrient: "vertical",
								WebkitLineClamp: 2,
								height: "100%",
								fontWeight: "bold",
							}}
						>
							{title}
						</Typography>
					</Tooltip>
				</Box>
				<Box
					sx={{
						height: "50px",
					}}
				>
					<Tooltip title={artist}>
						<Typography
							gutterBottom
							align="center"
							variant="h5"
							sx={{
								display: "-webkit-box",
								overflow: "hidden",
								WebkitBoxOrient: "vertical",
								WebkitLineClamp: 2,
								height: "100%",
							}}
						>
							{artist}
						</Typography>
					</Tooltip>
				</Box>
				<Tooltip title={venueName}>
					<Typography
						variant="h6"
						sx={{ fontWeight: "bold", marginBottom: "20px" }}
					>
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
				</Tooltip>
				<Grid
					container
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
					}}
				>
					<Grid
						item
						xs={6}
						alignContent="justify"
						sx={{ width: "100%" }}
					>
						<Grid
							container
							sx={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
								display: "flex",
							}}
						>

							<Grid item xs={10}>
								<Typography
									gutterBottom
									align="center"
									variant="h6"
								>
									Fecha:
									{fromToCardDate}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6} sx={{ width: "100%" }}>
						<Grid
							container
							sx={{
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
								alignContent: "center",
								display: "flex",
							}}
						>
							<Grid
								item
								xs={10}
								sx={{ justifyContent: "flex-end" }}
							>
								<Typography
									gutterBottom
									align="center"
									variant="h6"
								>
									Hora:
									{createTimeFormat(time)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				
			</CardContent>
		</Card>
	);
}

export default EventCard;
