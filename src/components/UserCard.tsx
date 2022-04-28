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
		ShowModal({
			onSuccess: () => {
				history.push("/usersList");
			},
			type: ModalTypes.DeleteSucceededModalValues,
		});
	};

	return (
		<Card  variant="outlined">
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
						<Typography variant="h5" style={{ fontWeight: 600 }}>
							Nombre de usuario:
						</Typography>
						<Typography variant="h6">{username}</Typography>
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
						<Typography variant="h5" style={{ fontWeight: 600 }}>
							Nombre:
						</Typography>
						<Typography variant="h6">{firstName}</Typography>
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
						<Typography variant="h5" style={{ fontWeight: 600 }}>
							Apellido:
						</Typography>
						<Typography variant="h6">{lastName}</Typography>
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
						<Typography variant="h5" style={{ fontWeight: 600 }}>
							{admin ? "Es admin" : "No es admin"}
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
								<EditIcon sx={{ fontSize: 40 }} />
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
export default UserCard;
