/** @jsxImportSource theme-ui */
import { Button, Container, Grid, jsx, Label, Radio, Select, Text } from 'theme-ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextAreaInput from '../components/TextAreaInput'
import TextInput from '../components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../redux/eventsSlice'
import { CreateEvent,  EventStatus, Event, Venue, UpdateEvent, EventTypeStatus } from '../redux/types'
import ImageUpload from '../components/ImageUpload'
import { useState,  useEffect } from 'react'
import { postImage } from '../utils/blobStorageClient'
import { fetchVenues, selectAllVenues } from '../redux/venuesSlice'
import React from 'react'
import RadioButton from '../components/RadioButton'
import CalendarItem from '../components/CalendarItem'
import TimePickerItem from '../components/TimeItem'
import { RouteComponentProps } from 'react-router-dom'
import { fetchEventById, modifyEvent, singleEvent } from '../redux/eventSlice'


export interface Values {
    title: string,
    artist: string,
    venueId: string,
    // status: number,
    price: number,
    phone: string,
    type: EventTypeStatus,
    description: string,
    website: string,
    facebook: string,
    twitter: string,
    instagram: string,
    imageUrl?: string,
    // tagsId?: string[],
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
function UpdateEventForm({
    match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
    const dispatch = useDispatch()
    const [image, setImage] = useState<File>();
    const { venues } = useSelector(selectAllVenues);
    const { event } = useSelector(singleEvent);
    useEffect(() => {
        dispatch(fetchVenues())
        dispatch(fetchEventById(match.params.id))
    }, [dispatch,match.params.id])
    const [venueIdValue, setValueDropdown] = React.useState(event.venueId);
    const [statusValue, setValueRadio] = React.useState(EventTypeStatus.HYBRID);
    const [calendarValue, setCalendarValue] = useState(event.dates.dates.map((date)=>{return new Date(date)}));
    const [timeValue, settimeValue] = useState(new Date(event.dates.time));
    const [rangeOrMultipleValue, setrangeOrMultipleValue] = useState(event.dates.areindependent.toString());

    const handlerangeOrMultipleValue = (e: any) => {
        setrangeOrMultipleValue(e.target.value);
    }

    const handleChange = (e: any) => {
        setValueRadio(e.target.value);
    }
    const handletimeChange = (e: any) => {
        settimeValue(e);
    }

    const calendarOnChange = (e: any) => {
        setCalendarValue(e);
    }
    function setTime(): string {
        const value = timeValue.toString().split(":");
        const timeOfEvent = new Date();
        timeOfEvent.setHours(parseInt(value[0], 10));
        timeOfEvent.setMinutes(parseInt(value[1], 10));
        console.log(timeOfEvent.toISOString())
        return timeOfEvent.toISOString();
    }

    const handleSubmit = async (
        values: Values,
    ) => {
        let newImageUrl: string = '';
        if (image) {
            newImageUrl = await postImage(image)
        }
        values.type = statusValue;
        const updatedEvent: UpdateEvent = {
            ...values,
            status: 1,
            venueId: venueIdValue,
            imageUrl: newImageUrl,
            dates: {
                areindependent: (rangeOrMultipleValue === 'true'),
                dates: calendarValue.map((date) => {
                    return new Date(date.toString()).toISOString();
                }),
                time: setTime()
            }
        }

        // console.log(newEvent);
        await dispatch(modifyEvent({body:updatedEvent,eventId:event.id}))
    }
   
    const initialValues: Values = {
        title: event.title,
        artist: event.artist,
        venueId: event.venueId,
        price: event.price,
        phone: event.phone,
        type: EventTypeStatus.LIVE,//(event.type === 'Hibrido')  ? EventStatus.HYBRID : (event.type === 'Hibrido')  ? EventStatus.LIVE : EventStatus.VIRTUAL,
        description: event.description,
        website: event.website,
        facebook: event.facebook,
        twitter: event.twitter,
        instagram: event.instagram,
        imageUrl: event.imageUrl,
    }

    const venuesListDrop = venues.map((venue: Venue) => {
        return (
            <option value={venue.id} key={venue.id}>{venue.name}</option>
        )
    })
    return (
        <div >
            <Text>Actualiza un evento</Text>
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
                                    Espacio
                                    <Select
                                        value={venueIdValue}
                                        onChange={e => setValueDropdown(e.currentTarget.value)}
                                    >
                                        <option key="Sin espacio" value="No Venue">--Sin Espacio--</option>
                                        {venuesListDrop}
                                    </Select>
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
                                        <RadioButton
                                            id="Presencial"
                                            label="Presencial"
                                            name="statusValue"
                                            onChange={handleChange}
                                            value={EventTypeStatus.LIVE}
                                            defaultChecked={initialValues.type === EventTypeStatus.LIVE}
                                        />
                                        <RadioButton
                                            id="Virtual"
                                            label="Virtual"
                                            name="statusValue"
                                            onChange={handleChange}
                                            value={EventTypeStatus.VIRTUAL}
                                            defaultChecked={initialValues.type === EventTypeStatus.VIRTUAL}
                                        />
                                        <RadioButton
                                            id="Hibrido"
                                            label="Hibrido"
                                            name="statusValue"
                                            onChange={handleChange}
                                            value={EventTypeStatus.HYBRID}
                                            defaultChecked={initialValues.type === EventTypeStatus.HYBRID}
                                        />
                                    </Container>
                                    <Container >
                                        <RadioButton
                                            id="Rango"
                                            label="Rango de fechas"
                                            name="rangeCalendar"
                                            onChange={handlerangeOrMultipleValue}
                                            value="true"
                                            defaultChecked={rangeOrMultipleValue === "true"}
                                        />
                                        <RadioButton
                                            id="Individuales"
                                            label="Fechas individuales"
                                            name="rangeCalendar"
                                            onChange={handlerangeOrMultipleValue}
                                            value="false"
                                            defaultChecked={rangeOrMultipleValue === "false"}
                                        />
                                        <CalendarItem value={calendarValue} rangeOrMultiuple={rangeOrMultipleValue} onChange={calendarOnChange} />
                                        <TimePickerItem value={timeValue} onChange={handletimeChange} />
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
export default UpdateEventForm
