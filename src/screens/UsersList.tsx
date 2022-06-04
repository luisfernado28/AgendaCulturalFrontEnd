import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, PaginationContent, QueryParams, User } from "../redux/types";
import { countUsers, fetchUsers, selectAllUsers } from "../redux/usersSlice";
import UserCard from "../components/UserCard";
import { useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import {
	Box,
	Button,
	Grid,
	MenuItem,
	Pagination,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { buildPaginationSize } from "../utils/buildOdataParams";
import * as Yup from "yup";
import { useFormik } from "formik";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
interface Values {
	searchBar: string;
}
function UsersList(): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();
	const { users, count } = useSelector(selectAllUsers);
	const { userInfo } = useSelector(authUsers);
	const [topValueUsers] = useState(5);
	const [sortValue, setSortValueDropdown] = useState("username asc");
	const [page, setPage] = useState(1);
	let setQueryParams: QueryParams = {
		pagination: { top: topValueUsers, skip: 0 },
	};
	const [queryParameters, setqueryParameters] = useState(setQueryParams);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		let queryParams: QueryParams = { ...queryParameters };
		const pag: PaginationContent = {
			skip: (value - 1) * topValueUsers,
			top: queryParameters.pagination.top,
		};
		queryParams.pagination = pag;
		setqueryParameters(queryParams);
	};

	const SearchUserSchema = Yup.object().shape({
		searchBar: Yup.string()
			.min(1, "Al menos un caracter")
			.max(
				50,
				"El nombre de usuario no puede contener mas de 50 caracteres "
			),
	});

	useEffect(() => {
		dispatch(fetchUsers(queryParameters));
		dispatch(countUsers(queryParameters));
	}, [dispatch, queryParameters]);

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
	const handleSubmit = async (values: Values) => {
		let queryParams: QueryParams = {};
		if (values.searchBar) {
			const filter: Filter = {
				username: values.searchBar,
				firstname: values.searchBar,
				lastname: values.searchBar,
			};
			queryParams.filter = filter;
		}

		if (sortValue !== "Ordenar") {
			const orderby: string[] = [sortValue];
			queryParams.orderby = orderby;
		}
		const pag: PaginationContent = {
			skip: 0,
			top: queryParameters.pagination.top,
		};
		queryParams.pagination = pag;
		setPage(1);
		if (Object.keys(queryParams).length === 0) {
			// dispatch(fetchFullEvents({}));
		} else {
			setqueryParameters(queryParams);
			// dispatch(fetchFullEvents(queryParams));
		}
	};

	const formik = useFormik({
		initialValues: {
			searchBar: "",
		},
		validationSchema: SearchUserSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
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
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
					}}
				>
					<Grid
						container
						spacing={2}
						direction="row"
						alignItems="center"
						justifyContent="center"
						width={"500px"}
					>
						<Grid item xs={12} sm={8} md={8} lg={8}>
							<TextField
								fullWidth
								id="searchBar"
								name="searchBar"
								label="Busqueda"
								value={formik.values.searchBar}
								onChange={formik.handleChange}
								error={
									formik.touched.searchBar &&
									Boolean(formik.errors.searchBar)
								}
								helperText={
									formik.touched.searchBar &&
									formik.errors.searchBar
								}
							/>
						</Grid>
						<Grid item xs={12} sm={2} md={2} lg={2}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
									p: 1,
									m: 1,
									bgcolor: "background.paper",
									borderRadius: 1,
								}}
							>
								<Select
									value={sortValue}
									onChange={(e) => {
										setSortValueDropdown(e.target.value);
									}}
								>
									<MenuItem value="username asc">
										<ArrowUpwardIcon />
									</MenuItem>
									<MenuItem value="username desc">
										<ArrowDownwardIcon />
									</MenuItem>
								</Select>
							</Box>
						</Grid>
						<Grid item xs={12} sm={2} md={2} lg={2}>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								type="submit"
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Box>
			</form>
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
