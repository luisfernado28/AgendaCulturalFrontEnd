/*
 * File: Header.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import {
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUsers, logOutUser } from "../redux/authSlice";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";

const Header = (): JSX.Element => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loggedIn, userInfo } = useSelector(authUsers);
	const handleLogout = () => {
		dispatch(logOutUser(userInfo));
		history.push("/Signin");
	};
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, color: "#FFFFFF" }}
					>
						Bienvenido Agenda Cultural La Paz
					</Typography>
					{loggedIn ? (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="neutral"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem
									onClick={() => history.push("/adminEvents")}
								>
									Admin Events
								</MenuItem>
								<MenuItem
									disabled={!userInfo.admin}
									onClick={() => history.push("/usersList")}
								>
									Admin Users
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									Log Out
								</MenuItem>
							</Menu>
						</div>
					) : (
						<Button href="/Signin" sx={{ color: "#FFFFFF" }}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
