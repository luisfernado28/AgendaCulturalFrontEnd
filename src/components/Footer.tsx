/*
 * File: Footer.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Box, Typography } from "@mui/material";

const Footer = (props: any): JSX.Element => {
	return (
		<Box sx={{backgroundColor: "#39B3BA"}}>
			<Typography
				variant="body2"
				color="#FFFFFF"
				align="center"
				{...props}
			>
				{"Copyright © "} {new Date().getFullYear()}
				{"."}
			</Typography>
		</Box>
	);
};

export default Footer;
