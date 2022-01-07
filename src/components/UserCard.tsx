/** @jsxRuntime classic */
/** @jsx jsx */
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Grid } from "theme-ui"
import {
	Text,
	jsx
} from 'theme-ui'
import { ModalTypes } from "../redux/types";
import ShowModal from './CustomModal'


interface UserProps {
	id: string,
	username: string,
	firstName: string,
	lastName: string,
	password: string,
	admin: boolean
}

function UserCard({
	username,
	firstName,
	lastName,
	admin,
	id
}: UserProps): JSX.Element {
	// const [adminValue, setAdminValue] = useState(admin);

	// const handleAdminValue = (e: any) => {
	//     setAdminValue(e.target.value);
	// }

	const handleDelete = (id: string) => {
		console.log('exito borrando!')
		// dispatch(removeEvent(id))
		// ShowModal({
		//     onSuccess: () => {
		//         history.push('/adminEvents')
		//     },
		//     type: ModalTypes.DeleteSucceededModalValues,
		// })
	}

	return (
		<Card
			variant="primary"
			sx={{
				width: '1500px',
				height: '350px'
			}}
		>
			<Grid
				columns={[2]}
				sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
			>
				<div>
					<Text>Username: {username}</Text><br />
					<Text>Nombre: {firstName}</Text><br />
					<Text>Apellido: {lastName}</Text><br />
					<Text>{(admin) ? 'Es admin' : 'No es admin'}</Text><br />

				</div>
				<Grid
					columns={[3]}
					sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
				>
					<div>
						<Link to={`/updateEvent/${id}`}>
							<FontAwesomeIcon icon={faEdit} />
						</Link>
					</div>
					<div>
						<Button onClick={() =>
							ShowModal({
								type: ModalTypes.ConfirmDeleteModalValues,
								onSuccess: () => handleDelete(id),
							})
						}
						>
							<FontAwesomeIcon icon={faTrash} />

						</Button>
					</div>

				</Grid>

			</Grid>

			{/* 
			<Container>
				Administrador
				<RadioButton
					id="Admin"
					label="AAdministrador"
					name="admin"
					onChange={handlerangeOrMultipleValue}
					value="true"
					defaultChecked={admin}
				/>
			</Container> */}
		</Card>
	)
}
export default UserCard
