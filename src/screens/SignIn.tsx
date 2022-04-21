import { FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../components/LoginFrom";
import { authUser, authUsers, timeOutLogOut } from "../redux/authSlice";
import { Status, UserCredentials } from "../redux/types";
import PageSpinner from "../components/Spinner";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userState = useSelector(authUsers);

	const handleSubmit = async (
		values: UserCredentials	) => {
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
			{/* <Button>
				<Link to="/">Regresar a eventos</Link>
			</Button> */}
			<LoginForm />
		</div>
	);
};
export default SignIn;
