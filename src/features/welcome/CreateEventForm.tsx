/** @jsxImportSource theme-ui */
import { Button, Container, Grid, jsx, Label, Text } from 'theme-ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextAreaInput from '../../components/TextAreaInput'
import TextInput from '../../components/TextInput'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../redux/eventsSlice'
import { CreateEvent, Event, Status } from '../../redux/types'


export interface Values {
    title: string,
    artist: string,
    // venueId: string,
    // status: number,
    price: number,
    // id: string,
    phone: string,
    // type: string,
    description: string,
    website: string,
    facebook: string,
    twitter: string,
    instagram: string,
    // imageUrl?: string,
    // dates: string[],
    // tagsId?: string[],
    // time?: string
}


const CreateEventSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, 'Al menos un caracter')
        .max(50, 'El titulo no puede tener mas que 50 caracteres ')
        .required('Titulo del evento es requerido'),
    artist: Yup.string()
        .min(1, 'Al menos un caracter')
        .max(50, 'El artista no puede tener mas que 50 caracteres ')
        .required('Artista del evento es requerido'),
    price: Yup.number()
        .max(1000, 'El precio no puede ser superior a 1000 Bs')
        .required('El precio es requerido, ingrese 0 si es gratuito'),
    description: Yup.string()
        .min(1, 'Al menos un caracter de descripción')
        .max(1000, 'La descripcion no puede ser mayor a 1000 caracteres ')
        .required('La descripcion es requerida'),
    website: Yup.string().url('Link debe ser una URL valida '),
    twitter: Yup.string().url('Link debe ser una URL valida de Twitter'),
    facebook: Yup.string().url('Link debe ser una URL valida de Facebook'),
    instagram: Yup.string().url('Link debe ser una URL valida de Instagra'),


})
function CreateEventForm(): JSX.Element {
    const dispatch = useDispatch()


    const handleSubmit = async (
        values: Values,
        // { setSubmitting }: FormikHelpers<Values>,
    ) => {
        console.log(values)
        const newEvent: CreateEvent = {
            ...values,
            venueId: '',
            status: 0,
            type: '',
            dates: []
        }
        await dispatch(createEvent(newEvent))
    }

    const initialValues: Values = {
        title: '',
        artist: '',
        // venueId: '',
        // status: 0,
        price: 0,
        // id: '',
        phone: '',
        // type: '',
        description: '',
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        // imageUrl: '',
        // dates: [''],
        // tagsId: [''],
        // time: ''
    }

    return (
        <div >
            <Text>Crea un nuevo evento!</Text>
            <Formik
                initialValues={initialValues}
                validationSchema={CreateEventSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid columns={[2]}>
                                <Container>
                                    <TextInput
                                        name="title"
                                        label="Titulo"
                                        placeholder="Titulo del evento"
                                        type="text"
                                    />
                                    <TextInput
                                        name="artist"
                                        label="Artista"
                                        placeholder="Artista"
                                        type="text"
                                    />
                                    Espacio, array from Venue Endpoint
                                    Dropdown of info
                                    <TextInput
                                        name="price"
                                        label="Precio"
                                        placeholder="Bs."
                                        type="number"
                                    />
                                    <TextAreaInput
                                        name="description"
                                        label="Descripción"
                                        placeholder="Descripción del evento"
                                        type="text"
                                    />
                                </Container>
                                <Container>
                                    <Text> Redes Sociales</Text>
                                    <TextInput
                                        name="facebook"
                                        label="Facebook"
                                        placeholder="https://facebook"
                                        type="url"
                                    />
                                    <TextInput
                                        name="twitter"
                                        label="Twitter"
                                        placeholder="https://twitter"
                                        type="url"
                                    />
                                    <TextInput
                                        name="instagram"
                                        label="Instagram"
                                        placeholder="https://Instagram"
                                        type="url"
                                    />
                                    <TextInput
                                        name="website"
                                        label="Pagina Web"
                                        placeholder="https://"
                                        type="url"
                                    />
                                    <TextInput
                                        name="phone"
                                        label="Telefono"
                                        placeholder=""
                                        type="string"
                                    />
                                </Container>
                            </Grid>

                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Button
                                    sx={{ marginLeft: '8px' }}
                                    type="submit"

                                >
                                    Create
                                </Button>
                            </Container>
                        </Form>
                    )
                }
            </Formik>
        </div >
    )
}
export default CreateEventForm
