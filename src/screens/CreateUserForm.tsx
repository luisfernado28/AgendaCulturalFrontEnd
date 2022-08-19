/*
 * File: CreateUserForm.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { useFormik } from "formik";
import { useState } from "react";
import { CreateUser } from "../redux/types";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/usersSlice";
import { useHistory } from "react-router-dom";
import { authUsers } from "../redux/authSlice";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
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
		await dispatch(createUser(newUser));
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
		<Box
			sx={{
				display: "inline-flex",
				flexDirection: "Column",
				justifyContent: "center",
				alignItems: "center",
				alignContent: "center",
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<Grid container direction={"column"} spacing={3}>
					<Typography gutterBottom variant="h5" component="h2">
						Crea un nuevo usuario!
					</Typography>
					<Grid item>
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
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleChange}
								/>
							}
							label="Es administrador"
						/>
					</Grid>
					<Grid item>
						<Button
							color="primary"
							variant="contained"
							type="submit"
						>
							Crear Usuario
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
export default CreateUserForm;
