/** @jsxImportSource theme-ui */
import { Form, Formik } from "formik";
import { useState } from "react";
import { Button, Container, Grid, Switch, Text } from "theme-ui";
import TextInput from "../components/TextInput";
import { CreateUser } from "../redux/types";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/usersSlice";

interface Values {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
}

const CreateUserSchema = Yup.object().shape({
	username: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El titulo no puede tener mas que 50 caracteres ")
		.required("Username requerido"),
	firstname: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El artista no puede tener mas que 50 caracteres ")
		.required("Nombre requerido"),
	lastname: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El artista no puede tener mas que 50 caracteres ")
		.required("Apellido es requerido"),
	password: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El artista no puede tener mas que 50 caracteres ")
		.required("Password requerida"),
});
function CreateUserForm(): JSX.Element {
	const dispatch = useDispatch();
	const [adminValue, setAdminValue] = useState(false);
	const handleSubmit = async (values: Values) => {
		const newUser: CreateUser = {
			...values,
			admin: adminValue,
		};
		console.log(newUser);
		await dispatch(createUser(newUser));
	};
	const initialValues: Values = {
		username: "",
		firstname: "",
		lastname: "",
		password: "",
	};
	return (
		<div>
			<Text>Crea un nuevo usuario!</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={CreateUserSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Grid columns={[2]}>
							<Container>
								<TextInput
									name="username"
									label="Username"
									placeholder="Username"
									type="text"
								/>
								<TextInput
									name="firstname"
									label="Nombre"
									placeholder="Nombre"
									type="text"
								/>
								<TextInput
									name="lastname"
									label="Apellido"
									placeholder="Apellido"
									type="text"
								/>
								<TextInput
									name="password"
									label="Contrasena"
									placeholder="Contrasena"
									type="text"
								/>
								<Switch
									label="Administrador?"
									onChange={() => setAdminValue(!adminValue)}
									value={0}
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
								Crear nuevo Usuario!
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</div>
	);
}
export default CreateUserForm;
