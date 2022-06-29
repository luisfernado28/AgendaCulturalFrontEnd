import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { string } from "yup/lib/locale";

const EventInfoBox = (props): JSX.Element => {
	const StatusImage = props.statusImage;
	const InfoTitle = props.title;
	const Content = props.content;
	// console.log(props.datesArray)
	// const listOfDates = Event.dates.map((inidividualDate) => {
	// 	const newDate = new Date(inidividualDate);
	// 	return (
	// 		<Typography variant="h6" key={1}>
	// 			{newDate.toDateString() + ", "}
	// 		</Typography>
	// 	);
	// });
	const contentOfBox = () => {
		switch (InfoTitle) {
			case "Escenario":
				const VenueInfo = Content.split("/");
				return <div>{VenueInfo[0] + "palce" + VenueInfo[1]}</div>;
			case "Fechas y Horario":
				if (Content) {
					return (
						<div>
							{props.datesArray.map((individualDate) => {
								return (
									new Date(individualDate).toDateString() +
									", "
								);
							})}
						</div>
					);
				} else {
					return (
						<div>
							{new Date(props.datesArray[0]).toDateString()} a{" "}
							{new Date(props.datesArray[1]).toDateString()}
						</div>
					);
				}
			case "Precio":
				return <div>{Content}</div>;
			case "Tipo de Evento":
				return <div>{Content}</div>;
			case "Contacto":
				return <div>{Content}</div>;
			default:
				return <div>a</div>;
		}
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "flex-start",
				maxWidth: "150px",
				//backgroundColor: "#ECEEFF",
			}}
		>
			{StatusImage}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "flex-start",
				}}
			>
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: 25,
					}}
				>
					{props.title}
				</Typography>
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: 15,
					}}
				>
					{contentOfBox()}
					{/* {props.content} */}
				</Typography>
			</Box>
		</Box>
	);
};

EventInfoBox.propTypes = {
	statusImage: PropTypes.element,
	title: string,
	content: string,
	datesArray: [],
};
export default EventInfoBox;
