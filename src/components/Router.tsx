
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import ListPage from '../features/welcome/Listpage'

const Router = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path="/" component={ListPage} />
        </Switch>
    )
}
export default withRouter(Router)
