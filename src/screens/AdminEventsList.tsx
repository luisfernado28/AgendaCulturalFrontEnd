/** @jsxImportSource theme-ui */
import { Grid, jsx, Text } from 'theme-ui'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectAllEvents } from "../redux/eventsSlice"
import { Event } from "../redux/types"
import EventCard from '../components/eventCard'
import AdminEventCard from '../components/adminEventCard'


function AdminEventsList(): JSX.Element {
    const dispatch = useDispatch()
    const { events, status } = useSelector(selectAllEvents)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    const eventsList = events.map((event: Event) => {
        return (
            <div key={event.id} >
                <AdminEventCard {...event} />
            </div>
        )
    })

    return (
        <div >
            <Text>Edita Eventos</Text>
            <Grid
                columns={[1]}
                sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px'}}
            >
            {eventsList}

            </Grid>
        </div>
    )
}
export default AdminEventsList
