
/** @jsxRuntime classic */
/** @jsx jsx */
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import {
    Card,
    Text,
    jsx,
    Box,
    Image,
    Grid,
    Button
} from 'theme-ui'
import ShowModal from './CustomModal'


import { Event, ModalTypes } from '../redux/types'
import { fetchVenueById, singleVenue } from '../redux/venueSlice';
import { removeEvent } from '../redux/eventsSlice';

function AdminEventCard({
    id,
    title,
    artist,
    imageUrl,
    price,
    description,
    dates,
    venueId,
    type
}: Event): JSX.Element {
    const dispatch = useDispatch()
    const history = useHistory()

    const { Venue } = useSelector(singleVenue)
    useEffect(() => {
        if (venueId !== '--Select--') {
            dispatch(fetchVenueById(venueId))
        }
    }, [dispatch, venueId])
    

    const handleDelete = (id: string) => {
        
        dispatch(removeEvent(id))
        ShowModal({
          onSuccess: () => {
            history.push('/')
          },
          type: ModalTypes.DeleteSucceededModalValues,
        })
      }

    return (
        <Card variant="primary" sx={{
            width: '1500px',
            height: '350px',
        }}>
            <Text>{title} </Text>
            <Grid
                columns={[2]}
                sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
            >
                <Grid
                    columns={[2]}
                    sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
                >
                    <div>
                        Artista/Elenco:
                        <Text>
                            {artist}
                        </Text><br />
                        Escenario:
                        <Text>
                            {Venue.name}
                        </Text><br />
                        Fecha:
                        <Text>
                            {new Date(dates.dates[0]).toISOString()}
                        </Text>
                    </div>
                    <div>
                        Precio:
                        <Text>
                            {price}
                        </Text><br />
                        Tipo de evento:
                        <Text>
                            {type}
                        </Text><br />
                        Hora:
                        <Text>
                            {new Date(dates.time).toISOString()}
                        </Text>
                    </div>
                </Grid>
                <Grid
                    columns={[3]}
                    sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
                >

                    <div>
                        <Box >
                            <Image src={`${process.env.REACT_APP_Blob_API}${imageUrl}`} variant="card"></Image>
                        </Box>
                    </div>
                    <div>
                        <Link to={`/updateEvent/${id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>
                    </div>
                    <div>
                        <Button onClick={() =>
                            ShowModal({
                                type: ModalTypes.ConfirmDeleteModalValues,
                                onSuccess: () => handleDelete(id),
                            })
                        }>
                         <FontAwesomeIcon icon={faTrash} />

                        </Button>
                    </div>
                </Grid>

            </Grid>
            {/* <Box>
        <Image src={`${process.env.REACT_APP_Blob_API}${imageUrl}`} variant="card"></Image>
      </Box>
      <Box>
        <Text sx={{ color: 'red' }}>{frontCardDate}</Text><Text>{title}</Text><br />
        <Link to={`/updateEvent/${id}`}>
          {(venueId === '--Select--')
            ? <Text>Venue: Sin evento</Text>
            : <Text>Venue:{Venue.name}</Text>
          }

        </Link>
        <br/>
        <Link to={`/events/${id}`}>
          <Text>Dates:{fromToCardDate}</Text><br />
        </Link>
        <Text>Time {new Date(dates.time).getHours() + ':' + new Date(dates.time).getMinutes()}</Text><br />
        <Text>Precio:{price}</Text><br />
      </Box> */}
        </Card>
    )
}

export default AdminEventCard

