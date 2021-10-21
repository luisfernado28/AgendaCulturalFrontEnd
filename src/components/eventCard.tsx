
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
  const frontCardDate = new Date(dates[0]).getDay() + '/' + new Date(dates[0]).toLocaleString('default', { month: 'short' }); //+ '/' + dateOfEvent.getFullYear();
  const fromToCardDate = setDatesRange();
  const dispatch = useDispatch()

  const { Venue, venueStatus } = useSelector(singleVenue)
  useEffect(() => {
    dispatch(fetchVenueById(venueId))
  }, [dispatch])
  console.log(Venue);
  function setDatesRange(): string {
    const first = new Date(dates[0]);
    if (dates.length == 1) {
      return first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' });
    } else {
      const last = new Date(dates[dates.length - 1]);
      const string = 'Desde ' + first.getDay() + ' de ' + first.toLocaleString('default', { month: 'long' }) + ' hasta el ' + last.getDay() + ' de ' + last.toLocaleString('default', { month: 'long' });
      return string;
    }

  }

  //TODO code for blob containers
  //getImage();
  async function getImage() {
    //Info strings
    const account = "storageagendacultural";
    const sas = "?sv=2020-08-04&ss=bfqt&srt=sc&sp=rwdlacupitfx&se=2021-10-20T05:32:27Z&st=2021-10-19T21:32:27Z&spr=https,http&sig=jl0Ez%2B8G7tW5h%2FsUAkJu3IiO1xtP1w6CeUxfMR7s3KQ%3D";
    const containerName = "eventsimages";
    const blobName = "cat.jpg";

    //services 
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

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
        <Image src={imageUrl} variant="card"></Image>
      </Box>
      <Box>
        <Text sx={{ color: 'red' }}>{frontCardDate}</Text><Text>{title}</Text><br />
        <Text>Venue:{Venue.name}</Text><br />
        <Text>Dates:{fromToCardDate}</Text><br />
        <Text>Time {new Date(dates[0]).getTime() + ':' + new Date(dates[0]).getMinutes()}</Text><br />
        <Text>Categorias:{description}</Text><br />
        <Text>Precio:{price}</Text><br />
      </Box>
    </Card>
  )
}

export default EventCard
