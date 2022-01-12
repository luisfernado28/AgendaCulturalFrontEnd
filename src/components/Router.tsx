import { useSelector } from "react-redux";
import {
	Redirect,
	Route,
	Switch,
	useHistory,
	withRouter,
} from "react-router-dom";
import authSlice, { authUsers } from "../redux/authSlice";
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

const Router = (): JSX.Element => {
	return (
		<Switch>
			<Route exact path="/" component={ListPage} />
			<Route exact path="/Signin" component={SignIn} />
			<Route exact path="/adminEvents" component={AdminEventsList} />
			<Route exact path="/usersList" component={UsersList} />
			{/* <Route exact path="/createEvent" component={CreateEventForm} /> */}
			<PrivateRoute exact path="/createEvent">
				<CreateEventForm />
			</PrivateRoute>
			<Route exact path="/createVenue" component={CreateVemueForm} />
			<Route exact path="/createUser" component={CreateUserForm} />
			<Route exact path="/updateEvent/:id" component={UpdateEventPage} />
			<Route exact path="/events/:id" component={EventsDetail} />
			<Route exact path="/updateUser/:id" component={UpdateUserPage} />
		</Switch>
	);
};
export default withRouter(Router);

interface propTypes {
	children: React.ReactNode;
	exact: boolean;
	path: string;
}
function PrivateRoute({ children, ...rest }: propTypes): JSX.Element {
	const userState = useSelector(authUsers);
	const history = useHistory();
	console.log(userState);
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