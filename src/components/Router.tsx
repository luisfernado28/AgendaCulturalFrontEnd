
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import AdminEventsList from '../screens/AdminEventsList'
import CreateEventForm from '../screens/CreateEventForm'
import CreateUserForm from '../screens/CreateUserForm'
import CreateVemueForm from '../screens/CreateVenueForm'
import EventsDetail from '../screens/EventDetail'
import ListPage from '../screens/Listpage'
import UpdateEventForm from '../screens/UpdateEventForm'
import UpdateEventPage from '../screens/UpdateEventPage'
import UsersList from '../screens/UsersList'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/adminEvents" component={AdminEventsList} />
            <Route exact path="/usersList" component={UsersList} />
            <Route exact path="/createEvent" component={CreateEventForm} />
            <Route exact path="/createVenue" component={CreateVemueForm} />
            <Route exact path="/createUser" component={CreateUserForm} />
            <Route exact path="/updateEvent/:id" component={UpdateEventPage} />
            <Route exact path="/events/:id" component={EventsDetail} />
        </Switch>
    )
}
export default withRouter(Router)
