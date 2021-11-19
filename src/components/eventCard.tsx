
/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  Card,
  Text,
  jsx,
  Box,
  Image
} from 'theme-ui'

import { Event } from '../redux/types'
import { fetchVenueById, singleVenue } from '../redux/venueSlice';

function EventCard({
  id,
  title,
  artist,
  imageUrl,
  price,
  description,
  dates,
  venueId
}: Event): JSX.Element {
  const frontCardDate = new Date(dates.dates[0]).getDay() + '/' + new Date(dates.dates[0]).toLocaleString('default', { month: 'short' }); //+ '/' + dateOfEvent.getFullYear();
  const fromToCardDate = setDatesRange();
  const dispatch = useDispatch()

  const { Venue } = useSelector(singleVenue)
  useEffect(() => {
    dispatch(fetchVenueById(venueId))
  }, [dispatch, venueId])
  function setDatesRange(): string {
    const first = new Date(dates.dates[0]);
    if (dates.dates.length === 1) {
      return first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' });
    } else {
      const last = new Date(dates.dates[dates.dates.length - 1]);
      const string = 'Desde ' + first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' }) + ' hasta el ' + last.getDay() + ' de ' + last.toLocaleString('default', { month: 'long' });
      return string;
    }
  }

  return (
    <Card variant="primary" sx={{
      maxWidth: 400,
      height: '350px',
    }}>
      <Box>
        <Image src={`${process.env.REACT_APP_Blob_API}${imageUrl}`} variant="card"></Image>
      </Box>
      <Box>
        <Text sx={{ color: 'red' }}>{frontCardDate}</Text><Text>{title}</Text><br />
        <Link to={`/updateEvent/${id}`}>
          <Text>Venue:{Venue.name}</Text><br />
        </Link>
        <Link to={`/events/${id}`}>
          <Text>Dates:{fromToCardDate}</Text><br />
        </Link>
        <Text>Time {new Date(dates.time).getHours() + ':' + new Date(dates.time).getMinutes()}</Text><br />
        <Text>Precio:{price}</Text><br />
      </Box>
    </Card>
  )
}

export default EventCard
