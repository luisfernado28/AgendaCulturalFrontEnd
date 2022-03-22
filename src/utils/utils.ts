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
