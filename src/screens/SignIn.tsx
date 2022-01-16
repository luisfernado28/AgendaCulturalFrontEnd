/** @jsxRuntime classic */
/** @jsx jsx */
import { FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, jsx } from "theme-ui";
import LoginForm from "../components/LoginFrom";
import { authUser } from "../redux/authSlice";
import { UserCredentials } from "../redux/types";

const SignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (
		values: UserCredentials,
		{ setSubmitting }: FormikHelpers<UserCredentials>
	) => {
		dispatch(authUser(values));
		history.push("/");
	};
	return (
		<div>
			<Button>
				<Link to="/">Regresar a eventos</Link>
			</Button>
			<LoginForm handleSubmit={handleSubmit} />
		</div>
	);
};
export default SignIn;
