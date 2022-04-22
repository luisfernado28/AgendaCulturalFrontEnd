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


export const castTypeOfEvent = (value: string): string =>{
	return value === "0"
	? "Hibrido"
	: value === "1"
	? "Presencial"
	: "Virtual"
}
