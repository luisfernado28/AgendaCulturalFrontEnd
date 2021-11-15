
/** @jsxRuntime classic */
/** @jsx jsx */
import { BlobDownloadResponseModel, BlobDownloadResponseParsed, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Container,
  Text,
  jsx,
  Box,
  Image
} from 'theme-ui'
import { date } from 'yup/lib/locale';

import { Event } from '../redux/types'
import { fetchVenueById, singleVenue } from '../redux/venueSlice';

function EventCard({
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

  const { Venue, venueStatus } = useSelector(singleVenue)
  useEffect(() => {
    dispatch(fetchVenueById(venueId))
  }, [dispatch])
  function setDatesRange(): string {
    const first = new Date(dates.dates[0]);
    if (dates.dates.length == 1) {
      return first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' });
    } else {
      const last = new Date(dates.dates[dates.dates.length - 1]);
      const string = 'Desde ' + first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' }) + ' hasta el ' + last.getDay() + ' de ' + last.toLocaleString('default', { month: 'long' });
      return string;
    }
  }


  let tagId = 0
  // const array = tags.split(',')

  // const tagArray = array.map(tag => {
  //   tagId++
  //   const tagColor = chance.color({ format: 'hex' })
  //   return (
  //     <div key={tagId}>
  //       {/* <Chip
  //         color={tagColor}
  //         id={tagId}
  //         label={tag}
  //         name={tag}
  //         outline={false}
  //       /> */}
  //     </div>
  //   )
  // })

  // const splitUrl = imageUrl.split('upload/')
  // const imageResized = `${splitUrl[0]}upload/w_512/${splitUrl[1]}`

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
        <Text>Venue:{Venue.name}</Text><br />
        <Text>Dates:{fromToCardDate}</Text><br />
        <Text>Time {new Date(dates.time).getHours() + ':' + new Date(dates.time).getMinutes()}</Text><br />
        <Text>Precio:{price}</Text><br />
      </Box>
    </Card>
  )
}

export default EventCard
