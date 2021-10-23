
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import CreateEventForm from '../features/welcome/CreateEventForm'
import ListPage from '../features/welcome/Listpage'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/createEvent" component={CreateEventForm} />
        </Switch>
    )
}
export default withRouter(Router)
