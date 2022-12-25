/*
 * File: UserCard.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ModalTypes } from "../redux/types";
import { removeUser } from "../redux/usersSlice";
import ShowModal from "./CustomModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface UserProps {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	admin: boolean;
}

function UserCard({
	username,
	firstName,
	lastName,
	admin,
	id,
}: UserProps): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();
	const handleDelete = (id: string) => {
		dispatch(removeUser(id));
		history.push("/usersList");
		window.location.reload();
	};

	return (
		<Card variant="outlined">
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
							width: "100%",
						}}
					>
						<Grid container>
							<Grid item xs={4}>
								<Typography
									variant="h6"
									align="left"
									style={{ fontWeight: 600 }}
								>
									Nombre de usuario:
								</Typography>
							</Grid>
							<Grid
								item
								xs={8}
								sx={{
									display: "flex",
									justifyContent: "flex-start",
									alignItems: "center",
									alignContent: "center",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<Typography align="left" variant="h6">
									{username}
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
							<Grid item xs={4}>
								<Typography
									variant="h6"
									align="left"
									style={{ fontWeight: 600 }}
								>
									Nombre:
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="h6" align="left">
									{firstName}
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
							<Grid item xs={4}>
								<Typography
									variant="h6"
									style={{ fontWeight: 600 }}
									align="left"
								>
									Apellido:
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography align="left" variant="h6">
									{lastName}
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
						}}
					>
						<Typography variant="h6" style={{ fontWeight: 400 }}>
							{admin ? "Es administrador" : "No es administrador"}
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
							}}
						>
							<Link to={`/updateUser/${id}`}>
								<EditIcon
									sx={{ fontSize: 40, color: "#39B3BA" }}
								/>
							</Link>
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
							<Button
								onClick={() =>
									ShowModal({
										type: ModalTypes.ConfirmDeleteUserModalValues,
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
export default UserCard;
