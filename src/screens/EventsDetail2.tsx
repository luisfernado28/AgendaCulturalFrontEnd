import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import EventsDescription from '../components/EventDescription'
import PageSpinner from '../components/Spinner'
import { fetchEventById, singleEvent } from '../redux/eventSlice'
import { Status } from '../redux/types'
import { fetchVenueById, singleVenue } from '../redux/venueSlice'


function EventsDetail2({
    match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
    const dispatch = useDispatch()
    const { event, eventStatus } = useSelector(singleEvent)
    const { Venue, venueStatus } = useSelector(singleVenue)


    useEffect(() => {
        dispatch(fetchEventById(match.params.id))
        if (!event.venueId.startsWith('-')) {
            console.log('no nombre')
            dispatch(fetchVenueById(event.venueId))
        }
    }, [dispatch, event.venueId, match.params.id])

    if (eventStatus === Status.IDLE) {
        return <Fragment></Fragment>
    }
    if (eventStatus === Status.LOADING) {
        return <PageSpinner />
    }
    if (eventStatus === Status.FAILED) {
        return <Fragment></Fragment>
    }
    if (event.venueId.startsWith('-')) {

        return (
            <EventsDescription {...event} />
        )
    }else{
        return (
            <EventsDescription {...event} {...Venue} />
        )
    }
}

export default EventsDetail2
