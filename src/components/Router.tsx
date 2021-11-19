
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import CreateEventForm from '../screens/CreateEventForm'
import CreateVemueForm from '../screens/CreateVenueForm'
import EventsDetail from '../screens/EventDetail'
import ListPage from '../screens/Listpage'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/createEvent" component={CreateEventForm} />
            <Route exact path="/createVenue" component={CreateVemueForm} />
            <Route exact path="/events/:id" component={EventsDetail} />
        </Switch>
    )
}
export default withRouter(Router)
