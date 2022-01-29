import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import PageSpinner from "../components/Spinner";
import { Status } from "../redux/types";
import { fetchUserById, singleUser } from "../redux/userSlice";
import { Text } from "theme-ui";
import UpdateUserForm from "../components/UpdateUserForm";
import { authUsers } from "../redux/authSlice";

function UpdateUserPage({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const history = useHistory();
	const { user, userStatus } = useSelector(singleUser);
	const { userInfo } = useSelector(authUsers);
	useEffect(() => {
		dispatch(fetchUserById(match.params.id));
	}, [dispatch, match.params.id]);
	if (!userInfo.admin) history.push("/adminEvents");
	return (
		<Fragment>
			{userStatus === Status.IDLE ? (
				<div></div>
			) : userStatus === Status.LOADING ? (
				<PageSpinner />
			) : userStatus === Status.FAILED ? (
				<Text>Failure Fetching Data</Text>
			) : (
				<UpdateUserForm
					id={user.id}
					username={user.username}
					firstname={user.firstname}
					lastname={user.lastname}
					password={user.password}
					admin={user.admin}
				></UpdateUserForm>
			)}
		</Fragment>
	);
}
export default withRouter(UpdateUserPage);
