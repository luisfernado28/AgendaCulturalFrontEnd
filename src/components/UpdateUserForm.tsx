import { Form, Formik, useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import * as Yup from "yup";
import { UpdateUser, UserUpdateData } from "../redux/types";
import { modifyUser } from "../redux/userSlice";
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
	const [checked, setChecked] = useState(admin);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	const handleSubmit = async (values: Values) => {
		const newUser: UpdateUser = {
			...values,
			admin: adminValue,
		};
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
	const formik = useFormik({
		initialValues: {
			username: username,
			firstname: firstname,
			lastname: lastname,
			password: "",
		},
		validationSchema: CreateUserSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<div>
			Actualiza un usuario!
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
							
							type="password"
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
		</div>
	);
}

export default UpdateUserForm;
