import { Form, Formik, useFormik } from "formik";
import { useState } from "react";
import TextInput from "../components/TextInput";
import { CreateUser } from "../redux/types";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/usersSlice";
import { useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Switch,
	TextField,
} from "@mui/material";

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
	const history = useHistory();
	const { userInfo } = useSelector(authUsers);
	const [checked, setChecked] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleSubmit = async (values: Values) => {
		const newUser: CreateUser = {
			...values,
			admin: checked,
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
	const formik = useFormik({
		initialValues: {
			username: "",
			firstname: "",
			lastname: "",
			password: "",
		},
		validationSchema: CreateUserSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	if (!userInfo.admin) history.push("/adminEvents");
	return (
		<div>
			Crea un nuevo usuario!
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							id="username"
							name="username"
							label="Nombre de usuario"
							value={formik.values.username}
							onChange={formik.handleChange}
							error={
								formik.touched.username &&
								Boolean(formik.errors.username)
							}
							helperText={
								formik.touched.username &&
								formik.errors.username
							}
						/>
						<TextField
							id="firstname"
							name="firstname"
							label="Nombres"
							value={formik.values.firstname}
							onChange={formik.handleChange}
							error={
								formik.touched.firstname &&
								Boolean(formik.errors.firstname)
							}
							helperText={
								formik.touched.firstname &&
								formik.errors.firstname
							}
						/>
						<TextField
							id="lastname"
							name="lastname"
							label="Apellidos"
							value={formik.values.lastname}
							onChange={formik.handleChange}
							error={
								formik.touched.lastname &&
								Boolean(formik.errors.lastname)
							}
							helperText={
								formik.touched.lastname &&
								formik.errors.lastname
							}
						/>
						<TextField
							id="password"
							name="password"
							label="Contraseña"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password)
							}
							helperText={
								formik.touched.password &&
								formik.errors.password
							}
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleChange}
								/>
							}
							label="Es administrador"
						/>
						<Button
							color="primary"
							variant="contained"
							type="submit"
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
			{/* <Formik
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
			</Formik> */}
		</div>
	);
}
export default CreateUserForm;
