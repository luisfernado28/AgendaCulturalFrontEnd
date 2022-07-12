import { UserCredentials } from "../redux/types";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { authUser } from "../redux/authSlice";
import { grey } from "@mui/material/colors";

export interface FormProps {
	handleSubmit: (
		values: UserCredentials,
		formikHelper: FormikHelpers<UserCredentials>
	) => void;
}

const LoginForm = (): JSX.Element => {
	const dispatch = useDispatch();
	const handleSubmit = async (values: UserCredentials) => {
		dispatch(authUser(values));
	};

	const LoginSchema = Yup.object().shape({
		username: Yup.string()
			.min(2, "The username cannot have less than 3 characters")
			.max(20, "The username cannot have more than 20 characters")
			.required("Nombre de usuario requerido"),
		password: Yup.string()
			.min(2, "The password must have more than 2 characters")
			.required("Contraseña requerida"),
	});

	const formik = useFormik({
		initialValues: { username: "", password: "" },
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid
				container
				component="main"
				sx={{ height: "100vh", width: "1000wh" }}
			>
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage:
							"url( https://storageagendacultural.blob.core.windows.net/eventsimages/morenadaSignIn2.jpg)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? grey[50]
								: grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						bgcolor: "background.paper",
						borderRadius: 1,
					}}
				>
					<Box
						sx={{
							display: "inline-flex",
							alignItems: "center",
							alignContent: "center",
							flexDirection: "column",
							justifyContent: "center",
							bgcolor: "background.paper",
							borderRadius: 1,
						}}
					>
						<Typography variant="h4" component="div">
							Bienvenido a agenda cultural
						</Typography>
						<br/>
						<TextField
							name="username"
							id="username"
							label="Nombre de usuario"
							placeholder="Nombre de usuario"
							value={formik.values.username}
							onChange={formik.handleChange}
							type="text"
							error={
								formik.touched.username &&
								Boolean(formik.errors.username)
							}
							helperText={
								formik.touched.username &&
								formik.errors.username
							}
						/>
						<br/>
						<TextField
							name="password"
							id="password"
							label="Contraseña"
							placeholder="Contraseña"
							type="password"
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
						<br/>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							sx={{
								color:"#FFFFFF"
							}}

						>
							Ingresa
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
		// </Form>
		// )}
		// </Formik>
	);
};
export default LoginForm;
