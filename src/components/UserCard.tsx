import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ModalTypes } from "../redux/types";
import { removeUser } from "../redux/usersSlice";
import ShowModal from "./CustomModal";

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
		<Card sx={{ Width: 800, Height: 300 }} variant="outlined">
			<Grid container>
				<Grid item xs={6}>
					<div>
						Username: {username}
						<br />
						Nombre: {firstName}
						<br />
						Apellido: {lastName}
						<br />
						{admin ? "Es admin" : "No es admin"}
						<br />
					</div>
				</Grid>
				<Grid item xs={6}>
					<Grid container>
						<Grid item xs={6}>
							<Link to={`/updateUser/${id}`}>
								<FontAwesomeIcon icon={faEdit} />
							</Link>
						</Grid>
						<Grid item xs={6}>
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
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}
export default UserCard;
