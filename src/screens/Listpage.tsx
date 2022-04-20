import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, FullEvent, QueryParams } from "../redux/types";
import EventCard from "../components/eventCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchFullEvents, selectAllFullEvents } from "../redux/fullEventsSlice";
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
import { authUsers } from "../redux/authSlice";

interface Values {
	searchBar: string;
}

function ListPage(): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvents } = useSelector(selectAllFullEvents);
	const { userInfo } = useSelector(authUsers);
	const [sortValue, setSortValueDropdown] = useState("title asc");
	const [top, setTop] = useState(10);
	const [skip, setSkip] = useState(0);

	const [page, setPage] = useState(1);
	console.log(skip);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setSkip((value - 1) * 10);

		setPage(value);
	};
	const CreateEventSchema = Yup.object().shape({
		searchBar: Yup.string()
			.min(1, "Al menos un caracter")
			.max(50, "El titulo no puede tener mas que 50 caracteres "),
	});

	useEffect(() => {
		let queryParams: QueryParams = {};
		dispatch(fetchFullEvents(queryParams));
	}, [dispatch]);
	const eventsList = fullEvents.map((event: FullEvent) => {
		return (
			<Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={event.id}>
				<EventCard
					id={event.id}
					title={event.title}
					imageUrl={event.imageUrl}
					price={event.price}
					dates={event.dates}
					venueName={event.venueName}
					artist={event.artist}
					venueId={event.venueId}
					status={0}
					phone={event.phone}
					type={event.type}
					description={event.description}
					website={event.website}
					facebook={event.facebook}
					twitter={event.twitter}
					instagram={event.instagram}
					areIndependent={event.areIndependent}
					time={event.time}
					tags={event.tags}
					address={event.address}
					venueWebsite={event.venueWebsite}
					venueFacebook={event.venueFacebook}
					venueTwitter={event.venueTwitter}
					venueInstagram={event.venueInstagram}
					venueDescription={event.venueDescription}
					locationType={event.locationType}
					locationCoordinates={event.locationCoordinates}
				/>
			</Grid>
		);
	});

	const handleSubmit = async (values: Values) => {
		let queryParams: QueryParams = {};
		if (values.searchBar) {
			const filter: Filter = {
				title: values.searchBar,
				artist: values.searchBar,
			};
			queryParams.filter = filter;
		}
		console.log(sortValue);

		if (sortValue !== "Ordenar") {
			const orderby: string[] = [sortValue];
			queryParams.orderby = orderby;
		}
		if (Object.keys(queryParams).length === 0) {
			dispatch(fetchFullEvents({}));
		} else {
			dispatch(fetchFullEvents(queryParams));
		}
	};

	const formik = useFormik({
		initialValues: {
			searchBar: "",
		},
		validationSchema: CreateEventSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					<Grid item xs={3}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								p: 1,
								m: 1,
								bgcolor: "background.paper",
								height: 100,
								borderRadius: 1,
								width: "800px",
								flexDirection: "row",
								justifyContent: "center",
								alignContent: "center",
							}}
						>
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
								<Typography variant="h6" component="div">
									Ordenar
								</Typography>
								<Select
									value={sortValue}
									onChange={(e) => {
										setSortValueDropdown(e.target.value);
									}}
								>
									<MenuItem value="title asc">
										Titulo Ascendente
									</MenuItem>
									<MenuItem value="title desc">
										Titulo Descendente
									</MenuItem>
								</Select>
							</Box>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								type="submit"
							>
								Submit
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
			<Typography variant="h3" component="div">
				Eventos en tendencia
			</Typography>
			<Grid
				container
				spacing={3}
				rowSpacing={3}
				sx={{
					justifyContent: "stretch",
					my: "10px",
				}}
			>
				{fullEvents.length !== 0 ? (
					eventsList
				) : (
					<div>No existen eventos con esas caracteristicas :c</div>
				)}
			</Grid>
			{fullEvents.length !== 0 ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Pagination
						count={10}
						page={page}
						onChange={handleChange}
					/>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
export default ListPage;
