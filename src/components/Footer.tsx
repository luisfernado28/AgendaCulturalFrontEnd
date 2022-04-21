import { Box, Typography } from "@mui/material";

const Footer = (props: any): JSX.Element => {
	return (
		<Box sx={{backgroundColor: "#30CBD5"}}>
			<Typography
				variant="body2"
				color="text.secondary"
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
