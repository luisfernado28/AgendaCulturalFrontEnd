import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { fetchEventById, singleEvent } from '../redux/eventSlice'
import { Text } from 'theme-ui'


function EventsDetail({
    match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
    const dispatch = useDispatch()
    const { event } = useSelector(singleEvent)

    useEffect(() => {
        dispatch(fetchEventById(match.params.id))
    }, [dispatch])


    return (
        <Fragment>
            <Text>
                {event.title}
            </Text>
            <Text>
                Artista/Elenco:  {"\n"}
                {event.artist}
            </Text>
            <Text>
                Escenario: {"\n"}
                {event.venueId}
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
            <Text>
                Fechas: {"\n"}
                {event.dates.dates[0]}
            </Text>
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
            {match.params.id}
        </Fragment>
    )
}

export default EventsDetail
