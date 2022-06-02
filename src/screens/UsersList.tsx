import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationContent, QueryParams, User } from "../redux/types";
import { countUsers, fetchUsers, selectAllUsers } from "../redux/usersSlice";
import UserCard from "../components/UserCard";
import { useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import { buildPaginationSize } from "../utils/buildOdataParams";

function UsersList(): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();
	const { users, count } = useSelector(selectAllUsers);
	const { userInfo } = useSelector(authUsers);
	const [topValueUsers] = useState(5);
	let skip = 0;
	const [page, setPage] = useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		skip = (value - 1) * 5;
		setPage(value);
		dispatchPageContent(topValueUsers, skip);
	};
	useEffect(() => {
		dispatchPageContent(topValueUsers, skip);
	}, [dispatch]);

	const dispatchPageContent = (topValue: number, skipValue: number) => {
		let paginationvalues: PaginationContent = {
			top: topValue,
			skip: skipValue,
		};
		let queryParams: QueryParams = { pagination: paginationvalues };
		dispatch(fetchUsers(queryParams));
		dispatch(countUsers(queryParams));
	};

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
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
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
				spacing={{ xs: 12 }}
				rowSpacing={2}
			>
				{usersList}
			</Grid>
			<Pagination
				count={buildPaginationSize(count, topValueUsers)}
				page={page}
				onChange={handleChange}
			/>
		</Box>
	);
}

export default UsersList;
