/** @jsxRuntime classic */
/** @jsx jsx */
import { FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, jsx } from "theme-ui";
import LoginForm from "../components/LoginFrom";
import { authUser, authUsers, timeOutLogOut } from "../redux/authSlice";
import { Status, UserCredentials } from "../redux/types";
import { o } from "odata";
import PageSpinner from "../components/Spinner";

const SignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();

	const userState = useSelector(authUsers);

	const handleOdata = async () => {
		const data1 = await o("http://localhost:5000/")
			.get("v1.0/Events")
			.query({ $top: 3 });
	};
	const handleSubmit = async (
		values: UserCredentials,
		{ setSubmitting }: FormikHelpers<UserCredentials>
	) => {
		dispatch(authUser(values));
	};

	let Errortitle: string | undefined;
	if (userState.requestStatus === Status.LOADING) return <PageSpinner />;
	else if (userState.loggedIn) {
		if (userState.requestErrorCode === 401) dispatch(timeOutLogOut());
		history.push("/adminEvents");
	} else if (
		userState.requestStatus === Status.FAILED ||
		userState.requestError
	)
		Errortitle = userState.requestError;

	return (
		<div>
			<Button>
				<Link to="/">Regresar a eventos</Link>
			</Button>
			<LoginForm handleSubmit={handleSubmit} />
			<Button onClick={() => handleOdata()}>a</Button>
		</div>
	);
};
export default SignIn;
