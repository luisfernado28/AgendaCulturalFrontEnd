/** @jsxImportSource theme-ui */
import { Button, Container, Grid, jsx, Label, Radio, Select, Text } from 'theme-ui'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextAreaInput from '../components/TextAreaInput'
import TextInput from '../components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../redux/eventsSlice'
import { CreateEvent, EventStatus, Event, Venue, UpdateEvent, Status } from '../redux/types'
import ImageUpload from '../components/ImageUpload'
import { useState, useEffect, Fragment } from 'react'
import { postImage } from '../utils/blobStorageClient'
import { fetchVenues, selectAllVenues } from '../redux/venuesSlice'
import React from 'react'
import RadioButton from '../components/RadioButton'
import CalendarItem from '../components/CalendarItem'
import TimePickerItem from '../components/TimeItem'
import { RouteComponentProps } from 'react-router-dom'
import { fetchEventById, modifyEvent, singleEvent } from '../redux/eventSlice'
import PageSpinner from '../components/Spinner'
import UpdateEventForm2 from '../components/UpdateEventForm2'


export interface Values {
    title: string,
    artist: string,
    venueId: string,
    // status: number,
    price: number,
    phone: string,
    type: EventStatus,
    description: string,
    website: string,
    facebook: string,
    twitter: string,
    instagram: string,
    imageUrl?: string,
    // tagsId?: string[],
}


function UpdateEventPage({
    match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
    const dispatch = useDispatch()
    const { event, eventStatus } = useSelector(singleEvent);

    useEffect(() => {
        dispatch(fetchEventById(match.params.id))
    }, [dispatch, match.params.id])

    console.log(event);
    console.log(eventStatus);


    return (
        <Fragment>
            {eventStatus === Status.IDLE ? (
                <div></div>
            ) : eventStatus === Status.LOADING ? (
                <PageSpinner />
            ) : eventStatus === Status.FAILED ? (
                <Text>Failure Fetching Data</Text>
            ) : (
                <UpdateEventForm2
                    title={event.title}
                    venueId={event.venueId}
                    type={EventStatus.FINISHED}
                    dates={event.dates}
                    event={event}
                    artist={event.artist}
                    price={event.price}
                    phone={event.phone}
                    description={event.description}
                    website={event.website}
                    facebook={event.facebook}
                    twitter={event.twitter}
                    instagram={event.instagram}
                />
            )}
        </Fragment>
    )
}
export default UpdateEventPage
