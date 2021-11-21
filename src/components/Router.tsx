
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import AdminEventsList from '../screens/AdminEventsList'
import CreateEventForm from '../screens/CreateEventForm'
import CreateVemueForm from '../screens/CreateVenueForm'
import EventsDetail from '../screens/EventDetail'
import ListPage from '../screens/Listpage'
import UpdateEventForm from '../screens/UpdateEventForm'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/adminEvents" component={AdminEventsList} />
            <Route exact path="/createEvent" component={CreateEventForm} />
            <Route exact path="/createVenue" component={CreateVemueForm} />
            <Route exact path="/updateEvent/:id" component={UpdateEventForm} />
            <Route exact path="/events/:id" component={EventsDetail} />
        </Switch>
    )
}
export default withRouter(Router)
