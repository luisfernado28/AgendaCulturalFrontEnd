
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

import { Event, Venue } from '../redux/types'
import { fetchVenueById, singleVenue } from '../redux/venueSlice';

function EventCard({
  id,
  title,
  imageUrl,
  price,
  dates,
  venueId
}: Event, { name }: Venue): JSX.Element {
  const frontCardDate = new Date(dates.dates[0]).getDay() + '/' + new Date(dates.dates[0]).toLocaleString('default', { month: 'short' }); //+ '/' + dateOfEvent.getFullYear();
  const fromToCardDate = setDatesRange();
  const dispatch = useDispatch()

  const { Venue } = useSelector(singleVenue)
  useEffect(() => {
    if (venueId !== '--Select--') {
      dispatch(fetchVenueById(venueId))
    }
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
      <div>
        <Link to={`/events/${id}`}>
          <Image src={`${process.env.REACT_APP_Blob_API}${imageUrl}`} variant="card"></Image>
        </Link>
      </div>
      <div>
        <Text sx={{ color: 'red' }}>{frontCardDate}</Text><Text>{title}</Text><br />
        <Link to={`/updateEvent/${id}`}>
          {
            (venueId === '--Select--')
              ? <Text>Venue: Sin evento</Text>
              : <Text>Venue:{Venue.name}</Text>
          }

        </Link>
        <br />
        <Text>Dates:{fromToCardDate}</Text><br />
        <Text>Time {new Date(dates.time).getHours() + ':' + new Date(dates.time).getMinutes()}</Text><br />
        <Text>Precio:{price}</Text><br />
      </div>
    </Card>
  )
}

export default EventCard
