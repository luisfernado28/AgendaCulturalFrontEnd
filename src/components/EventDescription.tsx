import { Fragment, useEffect } from 'react'
import { Event, Venue } from '../redux/types'
import { Box, Text, Image } from 'theme-ui'


function EventsDescription(event: Event, venue?: Venue): JSX.Element {
    return (
        <Fragment>
            Titulo
            <Text>
                {event}
            </Text>
            Artista/Elenco:
            <Text>
                {event.artist}
            </Text>
            <Text>
                Escenario: {"\n"}
                {(venue === undefined) ?
                    'Sin escenario'
                    :
                    venue.name}
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
            {(event.imageUrl === '')
                ?
                <Text>No image</Text>
                :
                <div>
                    <Image src={`${process.env.REACT_APP_Blob_API}${event.imageUrl}`} variant="card"></Image>
                </div>
            }
        </Fragment>
    )
}

export default EventsDescription
