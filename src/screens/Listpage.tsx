/** @jsxImportSource theme-ui */
import { Button, Grid, jsx, Text } from 'theme-ui'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectAllEvents } from "../redux/eventsSlice"
import { Event, EventTypeStatus } from "../redux/types"
import EventCard from '../components/eventCard'
import { singleVenue } from '../redux/venueSlice'
import { Link } from 'react-router-dom'
import { buildQueryParams } from '../utils/buildOdataParams'

function ListPage(): JSX.Element {
    const dispatch = useDispatch()
    const { events, status } = useSelector(selectAllEvents)
    const { Venue } = useSelector(singleVenue)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])
    buildQueryParams({
        title:'testTitle',
        artist: 'testArtist'
    })
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

    return (
        <div >
            <Button>
                <Link to='/adminEvents'>
                    Administrar eventos
                </Link>
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
