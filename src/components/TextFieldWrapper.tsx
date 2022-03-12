import React from "react";
import { useField } from "formik";
import { truncateSync } from "fs";
import { TextField } from "@mui/material";

const TextFieldWrapper = ({ name, ...otherProps }) => {
	const [field,mata] = useField(name);
	const configTextfield = {
		...otherProps,
		fullWidth: true,
		variant: "outlined",
		error:false,
		helperText: ""
	};

	if(mata && mata.touched && mata.error){
		configTextfield.error= true;
		configTextfield.helperText= mata.error
	}
	// return <TextField {...configTextfield} />;
};

export default TextFieldWrapper;
