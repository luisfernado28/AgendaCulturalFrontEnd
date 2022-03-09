import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { useDispatch } from "react-redux";
import { CreateVenue, GoogleLocation } from "../redux/types";
import TextAreaInput from "../components/TextAreaInput";

import { useHistory } from "react-router-dom";
import { createVenue } from "../redux/venuesSlice";
import { Button, Container, Grid } from "@mui/material";

export interface Values {
	name: string;
	address: string;
	website: string;
	facebook: string;
	twitter: string;
	instagram: string;
	description: string;
	location?: GoogleLocation;
}

const CreateEventSchema = Yup.object().shape({
	name: Yup.string()
		.min(1, "Al menos un caracter")
		.max(100, "El nombre no puede tener mas que 100 caracteres ")
		.required("Nombre del espacio es requerido"),
	address: Yup.string()
		.min(1, "Al menos un caracter")
		.max(150, "El artista no puede tener mas que 150 caracteres ")
		.required("Artista del evento es requerido"),
	website: Yup.string().url("Link debe ser una URL valida "),
	twitter: Yup.string().url("Link debe ser una URL valida de Twitter"),
	facebook: Yup.string().url("Link debe ser una URL valida de Facebook"),
	instagram: Yup.string().url("Link debe ser una URL valida de Instagra"),
	description: Yup.string().max(
		1000,
		"La descripcion no puede tener mas de 1000 Characteres "
	),
});
function CreateVemueForm(): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (values: Values) => {
		const newVenue: CreateVenue = {
			...values,
		};
		await dispatch(createVenue(newVenue));
		history.goBack();
		// history.push('/adminEvents');
	};

	const initialValues: Values = {
		name: "",
		address: "",
		website: "",
		facebook: "",
		twitter: "",
		instagram: "",
		description: "",
		location: {
			type: "",
			coordinates: [],
		},
	};

	return (
		<div>
			Crea un nuevo evento!
			<Formik
				initialValues={initialValues}
				validationSchema={CreateEventSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Grid columns={[2]}>
							<Container>
								<TextInput
									name="name"
									label="Nombre"
									placeholder="Titulo del evento"
									type="text"
								/>
								<TextInput
									name="address"
									label="Direccion"
									placeholder="Artista"
									type="text"
								/>
								<TextAreaInput
									name="description"
									label="Descripción"
									placeholder="Descripción del espacio"
									type="text"
								/>
							</Container>
							<Container>
								Redes Sociales
								<TextInput
									name="facebook"
									label="Facebook"
									placeholder="https://facebook"
									type="url"
								/>
								<TextInput
									name="twitter"
									label="Twitter"
									placeholder="https://twitter"
									type="url"
								/>
								<TextInput
									name="instagram"
									label="Instagram"
									placeholder="https://Instagram"
									type="url"
								/>
								<TextInput
									name="website"
									label="Pagina Web"
									placeholder="https://"
									type="url"
								/>
							</Container>
						</Grid>
						<Container
							sx={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<Button sx={{ marginLeft: "8px" }} type="submit">
								Create
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</div>
	);
}
export default CreateVemueForm;
