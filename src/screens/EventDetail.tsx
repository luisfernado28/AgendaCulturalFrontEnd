import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps} from 'react-router-dom'
import { fetchEventById, singleEvent } from '../redux/eventSlice'
import { Text } from 'theme-ui'
import { fetchVenueById, singleVenue } from '../redux/venueSlice'


function EventsDetail({
    match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
    const dispatch = useDispatch()
    const { event } = useSelector(singleEvent)
    const { Venue } = useSelector(singleVenue)


    useEffect(() => {
        dispatch(fetchEventById(match.params.id))
        dispatch(fetchVenueById(event.venueId))
    }, [dispatch,event.venueId,match.params.id])


    return (
        <Fragment>
            Titulo
            <Text>
                {event.title}
            </Text>
            Artista/Elenco:  
            <Text>
                {event.artist}
            </Text>
            <Text>
                Escenario: {"\n"}
                {Venue.name}
            </Text>
            <Text>
                Precio: {"\n"}
                {event.price}
            </Text>
            <Text>
                Telefono: {"\n"}
                {event.phone}
            </Text>
            <Text>
                Tipo de evento: {"\n"}
                {event.type}
            </Text>
            Fechas

            {event.dates.areindependent
                ?
                <Text>
                    
                    {new Date(event.dates.dates[0]).toDateString()}
                </Text>
                :
                <Text>
                    {new Date(event.dates.dates[0]).toDateString()}a
                    {new Date(event.dates.dates[1]).toDateString()}
                </Text>

            }

            <Text>
                Horario: {"\n"}
                {event.dates.time}
            </Text>
            <Text>
                Description: {"\n"}
                {event.description}
            </Text>

            <Text>
                Foto: {"\n"}
                {event.imageUrl}
            </Text>
        </Fragment>
    )
}

export default EventsDetail
