import { useDispatch, useSelector } from "react-redux";
import {
	Redirect,
	Route,
	Switch,
	useHistory,
	useLocation,
	useParams,
	withRouter,
} from "react-router-dom";
import { authUsers, LogOut } from "../redux/authSlice";
import AdminEventsList from "../screens/AdminEventsList";
import CreateEventForm from "../screens/CreateEventForm";
import CreateUserForm from "../screens/CreateUserForm";
import CreateVemueForm from "../screens/CreateVenueForm";
import EventsDetail from "../screens/EventDetail";
import ListPage from "../screens/Listpage";
import SignIn from "../screens/SignIn";
import UpdateEventPage from "../screens/UpdateEventPage";
import UpdateUserPage from "../screens/UpdateUserPage";
import UsersList from "../screens/UsersList";
import jwt from "jwt-decode";
import ShowModal from "./CustomModal";
import { ModalTypes } from "../redux/types";

const Router = (): JSX.Element => {
	let location = useLocation();

	function ValidateToken() {
		const history = useHistory();
		const dispatch = useDispatch();
		const authState = useSelector(authUsers);
		const token = authState.userInfo.token ?? "";
		if (token !== "") {
			const tokenDecoded: any = jwt(token.toString());
			const dateNow = new Date();
			if (tokenDecoded.exp * 1000 < dateNow.getTime()) {
				ShowModal({
					onSuccess: () => {
						dispatch(LogOut());
						history.push("/sign-in");
					},
					type: ModalTypes.SessionExpiredModal,
				});
			}
		}
	}
	ValidateToken();
	return (
		<Switch>
			<Route exact path="/" component={ListPage} />
			<Route exact path="/events/:id" component={EventsDetail} />

			<Route exact path="/Signin" component={SignIn} />
			<PrivateRoute exact path="/usersList">
				<UsersList />
			</PrivateRoute>
			<PrivateRoute exact path="/adminEvents">
				<AdminEventsList />
			</PrivateRoute>
			<PrivateRoute exact path="/createEvent">
				<CreateEventForm />
			</PrivateRoute>
			<PrivateRoute exact path="/createVenue">
				<CreateVemueForm />
			</PrivateRoute>
			<PrivateRoute exact path="/createUser">
				<CreateUserForm />
			</PrivateRoute>
			<Route exact path="/updateEvent/:id" component={UpdateEventPage} />
			{/* <Route exact path="/updateEvent/:eventId">
				<UpdateEventPage />
			</Route> */}
			<Route exact path="/updateUser/:id" component={UpdateUserPage} />
			{/* <PrivateRoute
				exact
				path="/updateEvent/:id"
				prop={UpdateEventPage}
			>
				<UpdateEventPage/>
				</PrivateRoute> */}
		</Switch>
	);
};
export default withRouter(Router);

interface propTypes {
	children: React.ReactNode;
	exact: boolean;
	path: string;
	// prop: any
}
function PrivateRoute({ children, ...rest }: propTypes): JSX.Element {
	const userState = useSelector(authUsers);
	const auth = userState.userInfo.token;
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth !== "" ? (
					children
				) : (
					<Redirect push to={{ pathname: "/Signin" }}></Redirect>
				)
			}
		/>
	);
}
