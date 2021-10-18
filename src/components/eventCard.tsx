
/** @jsxRuntime classic */
/** @jsx jsx */


import React from 'react'
import {
  Card,
  Container,
  Text,
  jsx
} from 'theme-ui'

import { Event } from '../redux/types'

function EventCard({
  title,
  artist,
  status,
  price,
  description,
}: Event): JSX.Element {
  const color = 'orange'

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
    <Card variant="primary">
      <Container
        sx={{
          justifyContent: 'space-between',
          px: '10px',
          height: '400px',
          width: '500px'
        }}
        variant="noMargin"
      >
        <Text> Title: {title}</Text><br/>
        <Text>Artist:{artist}</Text><br/>
        <Text>Status:{status}</Text><br/>
        <Text>Price:{price}</Text><br/>
        <Text>Description:{description}</Text><br/>
      </Container>
    </Card>
  )
}

export default EventCard
