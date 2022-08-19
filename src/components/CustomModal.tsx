/*
 * File: CustomModal.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import Swal from "sweetalert2";

import { ModalTypes } from "./../redux/types";

const ConfirmUpdateEventModalValues = {
	AllowOutsideClick: true,
	CancelButtonColor: "#DA3C3D",
	cancelbuttontext: "Cancelar",
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Si, actualizar",
	Icon: "warning",
	ShowCancelButton: true,
	Text: "El evento será actualizado",
	Title: "Esta seguro de actualizar este evento?",
};
const ConfirmUpdateUserModalValues = {
	AllowOutsideClick: true,
	CancelButtonColor: "#DA3C3D",
	cancelbuttontext: "Cancelar",
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Si, actualizar",
	Icon: "warning",
	ShowCancelButton: true,
	Text: "El usuario será actualizado",
	Title: "Esta seguro de actualizar este usuario?",
};

const ConfirmDeleteModalValues = {
	AllowOutsideClick: true,
	CancelButtonColor: "#DA3C3D",
	cancelbuttontext: "Cancelar",
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Si, eliminar",
	Icon: "warning",
	ShowCancelButton: true,
	Text: "Esta accion no podra ser revertida!",
	Title: "Esta seguro de eliminar este evento?",
};
const ConfirmDeleteUserModalValues = {
	AllowOutsideClick: true,
	CancelButtonColor: "#DA3C3D",
	cancelbuttontext: "Cancelar",
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Si, eliminar",
	Icon: "warning",
	ShowCancelButton: true,
	Text: "Esta accion no podra ser revertida!",
	Title: "Esta seguro de eliminar este usuario?",
};
const SessionExpiredModal = {
	AllowOutsideClick: false,
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Okay",
	Icon: "info",
	ShowCancelButton: false,
	Text: "Tu sesion expiro seras redirigido a la pagina de Log In!.",
	Title: "Sesion Expirada!",
};
const dictionary = new Map();

dictionary.set(ModalTypes.ConfirmDeleteModalValues, ConfirmDeleteModalValues);
dictionary.set(
	ModalTypes.ConfirmUpdateEventModalValues,
	ConfirmUpdateEventModalValues
);
dictionary.set(ModalTypes.SessionExpiredModal, SessionExpiredModal);
dictionary.set(
	ModalTypes.ConfirmUpdateUserModalValues,
	ConfirmUpdateUserModalValues
);
dictionary.set(
	ModalTypes.ConfirmDeleteUserModalValues,
	ConfirmDeleteUserModalValues
);

interface ModalOptions {
	type: string;
	onSuccess: () => void;
}
export default function showModal({ onSuccess, type }: ModalOptions): void {
	const {
		AllowOutsideClick,
		CancelButtonColor,
		cancelbuttontext,
		ConfirmButtonColor,
		ConfirmButtonText,
		Icon,
		ShowCancelButton,
		Text,
		Title,
	} = dictionary.get(type);

	Swal.fire({
		allowOutsideClick: AllowOutsideClick,
		cancelButtonColor: CancelButtonColor,
		cancelButtonText: cancelbuttontext,
		confirmButtonColor: ConfirmButtonColor,
		confirmButtonText: ConfirmButtonText,
		icon: Icon,
		showCancelButton: ShowCancelButton,
		text: Text,
		title: Title,
	}).then((result) => {
		if (result.isConfirmed) {
			onSuccess();
		}
	});
}
