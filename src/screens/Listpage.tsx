import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, Event, PaginationContent, QueryParams } from "../redux/types";
import EventCard from "../components/eventCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	countEvents,
	fetchEvents,
	selectAllEvents,
} from "../redux/EventsSlice";
import {
	Box,
	Button,
	Grid,
	IconButton,
	Pagination,
	TextField,
	Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { buildPaginationSize } from "../utils/buildOdataParams";
import ReactGA from "react-ga4";
import SearchIcon from "@mui/icons-material/Search";
interface Values {
	searchBar: string;
}

function ListPage(): JSX.Element {
	const dispatch = useDispatch();
	const { Events, count } = useSelector(selectAllEvents);
	const [sortValue2, setSortValueDropdown2] = useState(true);
	const [topValueUsers] = useState(10);
	const [page, setPage] = useState(1);
	let setQueryParams: QueryParams = {
		pagination: { top: topValueUsers, skip: 0 },
		activeEvents: true,
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
		dispatch(fetchEvents(queryParameters));
		dispatch(countEvents(queryParameters));
	}, [dispatch, queryParameters]);
	useEffect(() => {
		//This will not be excuted on the first time the use come to this page
		ReactGA.event({
			category: "Consumidores agenda cultural",
			action: "Pagina principal",
		});
	}, []);
	const eventsList = Events.map((event: Event) => {
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

			ReactGA.event("search", {
				category: "Consumidores agenda cultural",
				action: "Busqueda de evento" + values.searchBar.toLowerCase(),
				search_term: values.searchBar.toLowerCase(),
			});
			queryParams.filter = filter;
		}

		queryParams.orderby = sortValue2 ? ["title asc"] : ["title desc"];

		const pag: PaginationContent = {
			skip: 0,
			top: queryParameters.pagination.top,
		};
		queryParams.pagination = pag;
		queryParams.activeEvents = true;
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

	const handleButtonVariantChange = () => {
		setSortValueDropdown2(!sortValue2);
	};
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
						paddingTop: "20px",
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
						<Grid item xs={8} sm={6} md={6} lg={6}>
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
								}}
							>
								<IconButton onClick={handleButtonVariantChange}>
									{sortValue2 ? (
										<ArrowUpwardIcon fontSize="medium" />
									) : (
										<ArrowDownwardIcon fontSize="medium" />
									)}
								</IconButton>
							</Box>
						</Grid>
						<Grid item xs={2} sm={2} md={2} lg={2}>
							{/* <Button
								color="primary"
								variant="contained"
								fullWidth
								type="submit"
								endIcon={<SearchIcon />}
							>
								Buscar
							</Button>*/}
							<IconButton type="submit">
								<SearchIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Box>
			</form>
			<Typography variant="h3" component="div">
				Eventos en tendencia
			</Typography>
			{Events.length !== 0 ? (
				<Grid
					container
					spacing={3}
					rowSpacing={3}
					sx={{
						justifyContent: "stretch",
						my: "10px",
						paddingLeft: "85px",
						paddingRight: "85px",
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
export default ListPage;
