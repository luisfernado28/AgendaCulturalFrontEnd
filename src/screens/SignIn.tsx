/*
 * File: SignIn.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/LoginFrom";
import { authUsers, timeOutLogOut } from "../redux/authSlice";
import { Status } from "../redux/types";
import PageSpinner from "../components/Spinner";


const SignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userState = useSelector(authUsers);

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
