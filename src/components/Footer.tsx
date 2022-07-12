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
