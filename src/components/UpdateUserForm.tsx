import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ModalTypes, UpdateUser, UserUpdateData } from "../redux/types";
import { modifyUser } from "../redux/userSlice";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import ShowModal from "./CustomModal";
import { useHistory } from "react-router-dom";

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
	const history = useHistory();
	const [adminValue] = useState(false);
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
		history.push("/usersList");

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
			ShowModal({
				type: ModalTypes.ConfirmUpdateUserModalValues,
				onSuccess: () => handleSubmit(values),
			});
			
		},
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Grid container direction={"column"} spacing={3}>
					<Typography gutterBottom variant="h5" component="h2">
						Actualiza un usuario!
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
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default UpdateUserForm;
