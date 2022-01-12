/** @jsxImportSource theme-ui */
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "theme-ui";
import { authUsers, LogOut } from "../redux/authSlice";

const Header = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loggedIn } = useSelector(authUsers);
	const handleLogout = () => {
		dispatch(LogOut());
		history.push("/Signin");
	};

	return (
		<div
			sx={{
				backgroundImage: (theme) =>
					`linear-gradient(to right, #00923D, #3BB2B5 )`,
				height: "100px",
			}}
		>
			<Grid columns={[4]}>
				<div>Logo Alcaldia</div>
				<div>Search</div>
				<div>Bienvenido Agenda Cultural La Paz</div>
				<div>User Logo</div>
				{loggedIn ? (
					<button
						onClick={() => handleLogout()}
						sx={{
							borderBottomStyle: "none",
						}}
					>
						Log out
					</button>
				) : (
					<Link to="Signin">Signin</Link>
				)}
			</Grid>
		</div>
	);
};

export default Header;
