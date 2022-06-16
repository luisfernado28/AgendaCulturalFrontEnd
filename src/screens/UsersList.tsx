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
	makeStyles,
	MenuItem,
	Pagination,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { buildPaginationSize } from "../utils/buildOdataParams";
import * as Yup from "yup";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
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
		} else {
			setqueryParameters(queryParams);
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
				paddingTop: "20px",
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
						<Grid item xs={10} sm={6} md={6} lg={6}>
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
						<Grid item xs={2} sm={2} md={2} lg={2}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
									// height: "100%",
								}}
							>
								<Select
									sx={{
										height: "50%",
									}}
									value={sortValue}
									onChange={(e) => {
										setSortValueDropdown(e.target.value);
									}}
								>
									<MenuItem value="username asc">
										<ArrowUpwardIcon fontSize="medium" />
									</MenuItem>
									<MenuItem value="username desc">
										<ArrowDownwardIcon fontSize="medium" />
									</MenuItem>
								</Select>
							</Box>
						</Grid>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								type="submit"
								endIcon={<SearchIcon />}
							>
								Buscar
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
			{users.length !== 0 ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Pagination
						count={buildPaginationSize(count, topValueUsers)}
						page={page}
						onChange={handleChange}
					/>
				</div>
			) : (
				<div></div>
			)}
		</Box>
	);
}

export default UsersList;
