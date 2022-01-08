/** @jsxRuntime classic */
/** @jsx jsx */
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Grid } from "theme-ui";
import { Text, jsx } from "theme-ui";
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
		dispatch(removeUser(id))
		ShowModal({
		    onSuccess: () => {
		        history.push('/usersList')
		    },
		    type: ModalTypes.DeleteSucceededModalValues,
		})
	};

	return (
		<Card
			variant="primary"
			sx={{
				width: "1500px",
				height: "350px",
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
					<Text>Username: {username}</Text>
					<br />
					<Text>Nombre: {firstName}</Text>
					<br />
					<Text>Apellido: {lastName}</Text>
					<br />
					<Text>{admin ? "Es admin" : "No es admin"}</Text>
					<br />
				</div>
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
						<Link to={`/updateUser/${id}`}>
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
export default UserCard;
