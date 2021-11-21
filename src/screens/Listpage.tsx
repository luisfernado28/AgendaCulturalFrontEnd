/** @jsxImportSource theme-ui */
import { Button, Grid, jsx,  Text } from 'theme-ui'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectAllEvents } from "../redux/eventsSlice"
import { Event } from "../redux/types"
import EventCard from '../components/eventCard'
import { singleVenue } from '../redux/venueSlice'
import { Link } from 'react-router-dom'

function ListPage(): JSX.Element {
    const dispatch = useDispatch()
    const { events, status } = useSelector(selectAllEvents)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    const eventsList = events.map((event: Event) => {
        return (
            <div key={event.id} >
                <EventCard {...event} />
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
