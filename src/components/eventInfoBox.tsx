/*
 * File: eventInfoBox.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { string } from "yup/lib/locale";
import { createDateFormat, createTimeFormat } from "../utils/utils";

import "./../styles/components/InfoBox.css";

const EventInfoBox = (props): JSX.Element => {
	const StatusImage = props.statusImage;
	const InfoTitle = props.title;
	const Content = props.content;

	const contentOfBox = () => {
		switch (InfoTitle) {
			case "Escenario":
				const VenueInfo = Content.split("/");
				return <div>{VenueInfo[0] + "" + VenueInfo[1]}</div>;
			case "Fechas":
				if (Content) {
					return (
						<div>
							{props.datesArray.map((individualDate) => {
								return createDateFormat(individualDate) + ", ";
							})}
						</div>
					);
				} else {
					return (
						<div>
							{createDateFormat(props.datesArray[0])} a{" "}
							{createDateFormat(props.datesArray[1])}
						</div>
					);
				}
			case "Horario":
				return <div>{createTimeFormat(Content)}</div>;
			case "Precio":
				return (
					<div>
						{Content === 0 ? (
							<div>Gratis</div>
						) : (
							<div>{Content + " Bs"}</div>
						)}
					</div>
				);
			case "Tipo de Evento":
				return <div>{Content}</div>;
			case "Contacto":
				return <div>{Content}</div>;
			default:
				return <div>Not Specified</div>;
		}
	};
	return (
		<Box className="eventBox">
			{StatusImage}
			<Box className="contentText">
				<Typography sx={{ fontWeight: 700, fontSize: 25 }}>
					{props.title}
				</Typography>
				<Typography sx={{ fontWeight: 700, fontSize: 15 }}>
					{contentOfBox()}
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
