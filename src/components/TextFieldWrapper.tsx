/*
 * File: TextFieldWrapper.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
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
