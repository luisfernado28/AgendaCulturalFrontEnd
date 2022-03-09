
import { UserCredentials } from "../redux/types";
import { Form, Formik, FormikHelpers } from "formik";
import TextInput from "./TextInput";
import * as Yup from "yup";
import Button from '@mui/material/Button';

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, "The username cannot have less than 3 characters")
		.max(20, "The username cannot have more than 20 characters")
		.required("Username field is required"),
	password: Yup.string()
		.min(2, "The password must have more than 2 characters")
		.required("Password field is required"),
});

export interface FormProps {
	handleSubmit: (
		values: UserCredentials,
		formikHelper: FormikHelpers<UserCredentials>
	) => void;
}

const LoginForm = ({ handleSubmit }: FormProps): JSX.Element => {
	const initialValues: UserCredentials = { username: "", password: "" };

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={LoginSchema}
		>
			{({ handleSubmit, isSubmitting }) => (
				
				<Form onSubmit={handleSubmit}>
						Sign In
				
					<TextInput
						name="username"
						id="username"
						label="Username"
						placeholder="Enter username"
						type="text"
					/>
					
					<TextInput
						name="password"
						id="password"
						label="Password"
						placeholder="Enter password"
						type="password"
					/>
					
					<div>
						<Button
							type="submit"
							disabled={isSubmitting}
						>
							Sign In
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default LoginForm;
