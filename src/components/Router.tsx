
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import CreateEvent from '../features/welcome/CreateEvent'
import ListPage from '../features/welcome/Listpage'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/createEvent" component={CreateEvent} />
        </Switch>
    )
}
export default withRouter(Router)
