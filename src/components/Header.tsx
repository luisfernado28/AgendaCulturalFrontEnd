import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authUsers, logOutUser } from "../redux/authSlice";

const Header = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loggedIn, userInfo } = useSelector(authUsers);
	const handleLogout = () => {
		dispatch(logOutUser(userInfo));
		history.push("/Signin");
	};

	return (
		<div>
			<Grid columns={[4]}>
				<div>Logo Alcaldia</div>
				<div>Search</div>
				<div>Bienvenido Agenda Cultural La Paz</div>
				{loggedIn ? (
					<div>
						<Button onClick={() => handleLogout()}>Log out</Button>
						<Button onClick={() => history.push("/adminEvents")}>
							Admin Events
						</Button>
						<Button
							onClick={() => history.push("/usersList")}
							sx={{
								borderBottomStyle: "none",
							}}
							hidden={!userInfo.admin}
						>
							Admin Users
						</Button>
					</div>
				) : (
					<Link to="Signin">Signin</Link>
				)}
			</Grid>
		</div>
	);
};

export default Header;
