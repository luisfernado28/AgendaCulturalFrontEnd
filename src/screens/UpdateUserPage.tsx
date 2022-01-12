import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PageSpinner from "../components/Spinner";
import { Status } from "../redux/types";
import { fetchUserById, singleUser } from "../redux/userSlice";
import { Text } from "theme-ui";
import UpdateUserForm from "../components/UpdateUserForm";

function UpdateUserPage({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
	const dispatch = useDispatch();
	const { user, userStatus } = useSelector(singleUser);
	useEffect(() => {
		dispatch(fetchUserById(match.params.id));
	}, [dispatch, match.params.id]);
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
