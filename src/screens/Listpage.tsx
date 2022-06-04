import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Filter,
	FullEvent,
	PaginationContent,
	QueryParams,
} from "../redux/types";
import EventCard from "../components/eventCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	countFullEvents,
	fetchFullEvents,
	selectAllFullEvents,
} from "../redux/fullEventsSlice";
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { buildPaginationSize } from "../utils/buildOdataParams";
interface Values {
	searchBar: string;
}

function ListPage(): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvents, count } = useSelector(selectAllFullEvents);
	const [sortValue, setSortValueDropdown] = useState("title asc");
	const [topValueUsers] = useState(10);
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
	const CreateEventSchema = Yup.object().shape({
		searchBar: Yup.string()
			.min(1, "Al menos un caracter")
			.max(50, "El titulo no puede tener mas que 50 caracteres "),
	});
	useEffect(() => {
		dispatch(fetchFullEvents(queryParameters));
		dispatch(countFullEvents(queryParameters));
	}, [dispatch, queryParameters]);
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
			dispatch(fetchFullEvents({}));
		} else {
			setqueryParameters(queryParams);
			// dispatch(fetchFullEvents(queryParams));
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
									<MenuItem value="title asc">
										<ArrowUpwardIcon />
									</MenuItem>
									<MenuItem value="title desc">
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
			<Typography variant="h3" component="div">
				Eventos en tendencia
			</Typography>
			{fullEvents.length !== 0 ? (
				<Grid
					container
					spacing={3}
					rowSpacing={3}
					sx={{
						justifyContent: "stretch",
						my: "10px",
					}}
				>
					{eventsList}
				</Grid>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography variant="h3" component="div">
						No existen eventos con esas caracteristicas :c
					</Typography>
				</Box>
			)}
			{fullEvents.length !== 0 ? (
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
		</div>
	);
}
export default ListPage;
