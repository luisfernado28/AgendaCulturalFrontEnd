/** @jsxImportSource theme-ui */
import { Button, Grid, Select, Text } from "theme-ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, FullEvent, QueryParams } from "../redux/types";
import EventCard from "../components/eventCard";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchFullEvents, selectAllFullEvents } from "../redux/fullEventsSlice";

interface Values {
	searchBar: string;
}

function ListPage(): JSX.Element {
	const dispatch = useDispatch();
	const { fullEvents } = useSelector(selectAllFullEvents);
	const [sortValue, setSortValueDropdown] = useState("title asc");

	const initialValues: Values = {
		searchBar: "",
	};
	const CreateEventSchema = Yup.object().shape({
		searchBar: Yup.string()
			.min(1, "Al menos un caracter")
			.max(50, "El titulo no puede tener mas que 50 caracteres "),
	});
	useEffect(() => {

		dispatch(fetchFullEvents());
	}, [dispatch]);
	const eventsList = fullEvents.map((event: FullEvent) => {
		return (
			<div key={event.id}>
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
			</div>
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
		if (Object.keys(queryParams).length === 0) {
			dispatch(fetchFullEvents());
		} else {
			dispatch(fetchFullEvents(queryParams));
		}
	};
	return (
		<div>
			<Button>
				<Link to="/adminEvents">Administrar eventos</Link>
			</Button>
			<Button>
				<Link to="/usersList">Administrar usuarios</Link>
			</Button>
			<Formik
				initialValues={initialValues}
				validationSchema={CreateEventSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<TextInput
							name="searchBar"
							label="Buscar por titulo o artista"
							placeholder="Busque! por titulo o artista"
							type="text"
						/>
						<span>Ordenar</span>
						<Select
							value={sortValue}
							onChange={(e) =>
								setSortValueDropdown(e.currentTarget.value)
							}
						>
							<option key="Titulo Ascendente" value="title asc">
								Titulo Ascendente
							</option>
							<option key="Titulo Descendente" value="title desc">
								Titulo Descendente
							</option>
						</Select>
						<Button>Buscar</Button>
					</Form>
				)}
			</Formik>
			<Text>Eventos en tendencia</Text>
			<Grid
				columns={[2]}
				sx={{
					justifyContent: "stretch",
					my: "50px",
					rowGap: "100px",
					columnGap: "50px",
				}}
			>
				{fullEvents.length !== 0 ? (
					eventsList
				) : (
					<Text>No existen eventos con esas caracteristicas :c</Text>
				)}
			</Grid>
		</div>
	);
}
export default ListPage;
