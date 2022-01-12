/** @jsxRuntime classic */
/** @jsx jsx */
import { FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, jsx } from "theme-ui";
import LoginForm from "../components/LoginFrom";
import { authUser, authUsers } from "../redux/authSlice";
import { UserCredentials } from "../redux/types";

const SignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const { requestStatus, requestError, requestErrorCode, userInfo , loggedIn} =
		useSelector(authUsers);
	const history = useHistory();

	const callauth = () => {
		const credentials: UserCredentials = {
			username: "tes",
			password: "testy",
		};
		dispatch(authUser(credentials));
	};
	const handleSubmit = async (
		values: UserCredentials,
		{ setSubmitting }: FormikHelpers<UserCredentials>
	) => {
		dispatch(authUser(values));
		history.push('adminEvents');
	};
	return (
		<div>
			<Button onClick={() => callauth()} name="auth" title="auth" />
			<LoginForm handleSubmit={handleSubmit} />
			<Link to='/createEvent'>sadf</Link>
		</div>
	);
};
export default SignIn;
