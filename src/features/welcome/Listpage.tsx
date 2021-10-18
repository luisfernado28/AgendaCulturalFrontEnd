/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectAllEvents } from "../../redux/eventsSlice"
import { Event} from "../../redux/types"


function ListPage(): JSX.Element {
    const dispatch = useDispatch()
    const { events, status } = useSelector(selectAllEvents)

    useEffect(() => {
        dispatch(fetchEvents())
        // localStorage.removeItem('myFilter')
    }, [dispatch])

    const eventsList = events.map((event: Event) => {
        return (
            <div key={event.id} >
                {event.title}
                {event.price}
            </div>
        )
    })

    return (
        <div sx={{background: '#D5A030'}}>
            {status}
            {eventsList}
            Espacio de prueba
        </div>
    )
}
export default ListPage
