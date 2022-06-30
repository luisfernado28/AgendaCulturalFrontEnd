interface contents {
	image: File;
	title: string;
	venueName: string;
	calendarValue: Date;
}

const createImageForBlob = (props: contents): File => {
	return new File(
		[props.image],
		`${props.title}_${
			props.venueName
		}_${props.calendarValue.getDate()}_${props.calendarValue.getDay()}_${props.calendarValue.getMonth()}_${new Date()
			.toDateString()
			.replace(/ /g, "_")}`
	);
};
export default createImageForBlob;

export const castTypeOfEvent = (value: string): string => {
	return value === "0" ? "Hibrido" : value === "1" ? "Presencial" : "Virtual";
};

const meses = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
const dias_semana = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
];
export const createDateFormat = (date: string): string => {
	const newDate = new Date(date);
	return (
		dias_semana[newDate.getDay()] +
		", " +
		newDate.getDate() +
		" de " +
		meses[newDate.getMonth()] +
		" de " +
		newDate.getUTCFullYear()
	);
};
