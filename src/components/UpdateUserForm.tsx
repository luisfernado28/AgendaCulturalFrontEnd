import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Text, Grid, Switch } from "theme-ui";
import TextInput from "./TextInput";
import * as Yup from "yup";
import { UpdateUser, UserUpdateData } from "../redux/types";
import { modifyUser } from "../redux/userSlice";

interface Values {
	username: string;
	firstname: string;
	lastname: string;
	password: string;
}

const CreateUserSchema = Yup.object().shape({
	username: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "Username de al menos 50 caracteres ")
		.required("Username requerido"),
	firstname: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El nombre no puede ser de mas que 50 caracteres ")
		.required("Nombre requerido"),
	lastname: Yup.string()
		.min(1, "Al menos un caracter")
		.max(50, "El apellido  no puede tener mas que 50 caracteres ")
		.required("Apellido es requerido"),
	password: Yup.string()
		.min(1, "Al menos un caracter")
		.max(5000, "Contrasena muy larga ")
		.required("Password requerida"),
});

interface FormProps {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	admin: boolean;
}

function UpdateUserForm({
	id,
	username,
	firstname,
	lastname,
	password,
	admin,
}: FormProps): JSX.Element {
	const dispatch = useDispatch();
	const [adminValue, setAdminValue] = useState(false);
	const handleSubmit = async (values: Values) => {
		const newUser: UpdateUser = {
			...values,
			admin: adminValue,
		};
		console.log(newUser);
		const updateData: UserUpdateData = {
			userId: id,
			body: newUser,
		};
		await dispatch(modifyUser(updateData));
	};
	const initialValues: Values = {
		username: username,
		firstname: firstname,
		lastname: lastname,
		password: password,
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
									type="password"
									disabled={true}
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
								Actualizar usuario
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default UpdateUserForm;
