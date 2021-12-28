/** @jsxImportSource theme-ui */
import { Button, Grid, jsx, Text } from 'theme-ui'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectAllEvents } from "../redux/eventsSlice"
import { Event, EventTypeStatus, Filter, QueryParams } from "../redux/types"
import EventCard from '../components/eventCard'
import { singleVenue } from '../redux/venueSlice'
import { Link } from 'react-router-dom'
import { buildOrderBy, buildQueryParams } from '../utils/buildOdataParams'
import TextInput from '../components/TextInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

interface Values {
    searchBar: string
}


function ListPage(): JSX.Element {
    const dispatch = useDispatch()
    const { events, status } = useSelector(selectAllEvents)
    const { Venue } = useSelector(singleVenue)

    const initialValues: Values = {
        searchBar: '',
    }
    const CreateEventSchema = Yup.object().shape({
        searchBar: Yup.string()
            .min(1, 'Al menos un caracter')
            .max(50, 'El titulo no puede tener mas que 50 caracteres ')
    })
    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])
    const eventsList = events.map((event: Event) => {

        if (event.venueId !== '--Select--') {
        }
        return (
            <div key={event.id} >
                <EventCard
                    id={event.id}
                    title={event.title}
                    imageUrl={event.imageUrl}
                    price={event.price}
                    dates={event.dates}
                    venueName={Venue.name}
                    artist={''}
                    venueId={''}
                    status={0}
                    phone={''}
                    type={event.type}
                    description={''}
                    website={''}
                    facebook={''}
                    twitter={''}
                    instagram={''}
                />
            </div>
        )
    })

    const handleSubmit = async (
        values: Values,
    ) => {
        let queryParams: QueryParams = {};
        if (values.searchBar) {
            const filter: Filter = {
                title: values.searchBar,
                artist: values.searchBar
            }
            queryParams.filter = filter;
        }
        if (true) {
            const orderby: string[] = ['title asc', 'artist desc']
            queryParams.orderby = orderby;
        }
        if (Object.keys(queryParams).length === 0) {
            dispatch(fetchEvents())
        } else {
            dispatch(fetchEvents(queryParams))

        }
    }
    // buildOrderBy(['title asc','artist desc'])
    return (
        <div >
            <Button>
                <Link to='/adminEvents'>
                    Administrar eventos
                </Link>
            </Button>
            <Formik
                initialValues={initialValues}
                validationSchema={CreateEventSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <TextInput
                                name="searchBar"
                                label="Buscar por titulo o artista"
                                placeholder="Busque! por titulo o artista"
                                type="text"
                            />
                            <Button onClick={(x) => console.log(x)}>
                                Buscar
                            </Button>
                        </Form>
                    )
                }
            </Formik>

            <Button onClick={(x) => console.log(x)}>
                Titulo ascendente
            </Button>

            <Button onClick={(x) => console.log(x)}>
                Titulo ascendente
            </Button>
            <Text>Eventos en tendencia</Text>
            <Grid
                columns={[2]}
                sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
            >
                {eventsList}

            </Grid>
        </div>
    )
}
export default ListPage
