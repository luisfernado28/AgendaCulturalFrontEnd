import Swal from "sweetalert2";

import { ModalTypes } from "./../redux/types";

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

const DeleteSucceededModalValues = {
	AllowOutsideClick: true,
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Okay",
	Icon: "success",
	ShowCancelButton: false,
	Text: "Your event has been deleted.",
	Title: "Deleted!",
};

const ConfirmUpdateModalValues = {
	AllowOutsideClick: true,
	CancelButtonColor: "#DA3C3D",
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Yes, update it!",
	Icon: "warning",
	ShowCancelButton: true,
	Text: "Changes may affect the visibility of your event!",
	Title: "Are you sure?",
};
const UpdateSucceededModalValues = {
	AllowOutsideClick: true,
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Okay",
	Icon: "success",
	ShowCancelButton: false,
	Text: "Your event has been updated.",
	Title: "Updated!",
};

const SessionExpiredModal = {
	AllowOutsideClick: false,
	ConfirmButtonColor: "#3EBA9B",
	ConfirmButtonText: "Okay",
	Icon: "info",
	ShowCancelButton: false,
	Text: "Tu sesion expiro seras redirigido a la pagina de Log In!.",
	Title: "Session Expired!",
};
const dictionary = new Map();

dictionary.set(ModalTypes.ConfirmDeleteModalValues, ConfirmDeleteModalValues);
dictionary.set(
	ModalTypes.DeleteSucceededModalValues,
	DeleteSucceededModalValues
);
dictionary.set(
	ModalTypes.DeleteSucceededModalValues,
	DeleteSucceededModalValues
);
dictionary.set(ModalTypes.ConfirmUpdateModalValues, ConfirmUpdateModalValues);
dictionary.set(
	ModalTypes.UpdateSucceededModalValues,
	UpdateSucceededModalValues
);
dictionary.set(ModalTypes.SessionExpiredModal, SessionExpiredModal);

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
