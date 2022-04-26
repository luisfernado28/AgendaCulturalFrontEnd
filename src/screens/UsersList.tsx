import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../redux/types";
import { fetchUsers, selectAllUsers } from "../redux/usersSlice";
import UserCard from "../components/UserCard";
import { Link, useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import { Button, Grid } from "@mui/material";

function UsersList(): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();
	const { users } = useSelector(selectAllUsers);
	const { userInfo } = useSelector(authUsers);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const usersList = users.map((user: User) => {
		return (
			<Grid item xs={12} rowSpacing={3} key={user.id}>
				<UserCard
					id={user.id}
					username={user.username}
					firstName={user.firstname}
					lastName={user.lastname}
					password={user.password}
					admin={user.admin}
				/>
			</Grid>
		);
	});
	if (!userInfo.admin) history.push("/adminEvents");
	return (
		<div>
			<div>Usuarios</div>
			<Button   variant="contained" href="/createUser">
				Crear usuario
			</Button>

			<Grid
				container
				sx={{
					justifyContent: "stretch",
					my: "50px",
					rowGap: "100px",
					columnGap: "50px",
				}}
			>
				{usersList}
			</Grid>
		</div>
	);
}

export default UsersList;
