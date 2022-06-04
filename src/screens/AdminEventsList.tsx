import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Filter,
	Event,
	PaginationContent,
	QueryParams,
} from "../redux/types";
import AdminEventCard from "../components/adminEventCard";
import {
	fetchEvents,
	selectAllEvents,
	countEvents,
} from "../redux/EventsSlice";
import {
	Box,
	Button,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
	Pagination,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as Yup from "yup";
import { useFormik } from "formik";
import { buildPaginationSize } from "../utils/buildOdataParams";

interface Values {
	searchBar: string;
}
function AdminEventsList(): JSX.Element {
	const dispatch = useDispatch();
	const [sortValue, setSortValueDropdown] = useState("title asc");
	const [topValueUsers] = useState(10);

	let setQueryParams: QueryParams = {
		pagination: { top: topValueUsers, skip: 0 },
	};
	const [page, setPage] = useState(1);

	const [queryParameters, setqueryParameters] = useState(setQueryParams);
	const { Events, count } = useSelector(selectAllEvents);
	const CreateEventSchema = Yup.object().shape({
		searchBar: Yup.string()
			.min(1, "Al menos un caracter")
			.max(50, "El titulo no puede tener mas que 50 caracteres "),
	});
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

	useEffect(() => {
		dispatch(fetchEvents(queryParameters));
		dispatch(countEvents(queryParameters));
	}, [dispatch, queryParameters]);
	const eventsList = Events.map((event: Event) => {
		return (
			<Grid item xs={11} rowSpacing={15} key={event.id}>
				<AdminEventCard
					title={event.title}
					artist={event.artist}
					venueId={event.venueId}
					status={event.status}
					price={event.price}
					id={event.id}
					phone={event.phone}
					type={event.type}
					description={event.description}
					website={event.website}
					facebook={event.facebook}
					twitter={event.twitter}
					instagram={event.instagram}
					dates={event.dates}
					imageUrl={event.imageUrl}
					areIndependent={event.areIndependent}
					time={event.time}
					tags={event.tags}
					venueName={event.venueName}
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
			dispatch(fetchEvents({}));
		} else {
			setqueryParameters(queryParams);
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
			<Typography variant="h5" style={{ fontWeight: 600 }}>
				Edita Eventos
			</Typography>
			<Button variant="contained" href="/createEvent">
				Crear evento
			</Button>
			<Grid
				container
				sx={{
					my: "50px",
					direction: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				spacing={{ xs: 12 }}
				rowSpacing={5}
			>
				{eventsList}
			</Grid>
			{Events.length !== 0 ? (
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
export default AdminEventsList;
