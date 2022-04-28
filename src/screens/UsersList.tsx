import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../redux/types";
import { fetchUsers, selectAllUsers } from "../redux/usersSlice";
import UserCard from "../components/UserCard";
import { Link, useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import { Button, Grid, Typography } from "@mui/material";

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
			<Grid item xs={8} rowSpacing={3} key={user.id}>
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
			<Typography variant="h4" component="div">
				Usuarios
			</Typography>
			<Button variant="contained" href="/createUser">
				Crear usuario
			</Button>

			<Grid
				container
				sx={{
					my: "50px",
					rowGap: "50px",
					width: "500px",
					direction: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				spacing={{ xs: 12}}
				rowSpacing={2}
			>
				{usersList}
			</Grid>
		</div>
	);
}

export default UsersList;
