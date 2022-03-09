import { CircularProgress } from "@mui/material";

function PageSpinner(): JSX.Element {
	return (
		<div>
			<CircularProgress sx={{ color: "orange" }} />
		</div>
	);
}

export default PageSpinner;
