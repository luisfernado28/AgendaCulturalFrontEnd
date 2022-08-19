/*
 * File: Spinner.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { CircularProgress } from "@mui/material";

function PageSpinner(): JSX.Element {
	return (
		<div>
			<CircularProgress sx={{ color: "orange" }} />
		</div>
	);
}

export default PageSpinner;
