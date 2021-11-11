/** @jsxImportSource theme-ui */
import { Button, Container, Grid, jsx, Label, Radio, Text } from 'theme-ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextAreaInput from '../../components/TextAreaInput'
import TextInput from '../../components/TextInput'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../redux/eventsSlice'
import { CreateEvent, Event, EventStatus, Status } from '../../redux/types'
import ImageUpload from '../../components/ImageUpload'
import { useState, Fragment } from 'react'
import { postImage } from '../../utils/blobStorageClient'


export interface Values {
    title: string,
    artist: string,
    // venueId: string,
    // status: number,
    price: number,
    // id: string,
    phone: string,
    type: EventStatus,
    description: string,
    website: string,
    facebook: string,
    twitter: string,
    instagram: string,
    imageUrl?: string,
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
    const [image, setImage] = useState<File>()


    const handleSubmit = async (
        values: Values,
        // { setSubmitting }: FormikHelpers<Values>,
    ) => {
        let newImageUrl: string = '';
        if (image) {
            newImageUrl = await postImage(image)
        }
        console.log(values);

        const newEvent: CreateEvent = {
            ...values,
            venueId: 'asdfasdf',
            status: 3,
            imageUrl: newImageUrl,
            dates: {
                areindependent: true,
                dates: []
            }
        }
        //await dispatch(createEvent(newEvent))
    }

    const initialValues: Values = {
        title: '',
        artist: '',
        // venueId: '',
        // status: 0,
        price: 56,
        // id: '',
        phone: '',
        type: EventStatus.LIVE,
        description: '',
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        imageUrl: '',
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
                            <ImageUpload
                                fromChild={(local: File) => setImage(local)}
                                alt={''}
                            />
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
                                    <Container
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            width: '75%',
                                            '@media screen and (max-width:1400px)': {
                                                flexDirection: 'column',
                                            },
                                        }}>
                                        <Fragment>

                                            <Label>
                                                <Radio
                                                    name='type'
                                                    value={EventStatus.LIVE}
                                                    defaultChecked={initialValues.type === EventStatus.LIVE}
                                                />
                                                Presencial
                                            </Label>
                                        </Fragment>
                                        {/* <Fragment>
                                            <Label>
                                                <Radio
                                                    name='type'
                                                    value='false'
                                                />
                                                Virtual
                                            </Label>
                                        </Fragment> */}
                                        <Fragment>

                                            <Label>
                                                <Radio
                                                    name='type'
                                                    value={EventStatus.HYBRID}
                                                    defaultChecked={initialValues.type === EventStatus.HYBRID}
                                                />
                                                Hibrido
                                            </Label>
                                        </Fragment>

                                    </Container>

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
