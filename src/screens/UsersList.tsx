import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Status, User } from "../redux/types"
import { fetchUsers, selectAllUsers } from "../redux/usersSlice"
import { Button, Grid, Text } from 'theme-ui'

function UsersList(): JSX.Element {
    const dispatch = useDispatch()
    const { users, status } = useSelector(selectAllUsers)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    if (status == Status.SUCCEEDED)
        console.log(users);

    const usersList = users.map((user: User)=> {
        return (
            <div key={user.Id}>

            </div>
        )

    })
    return (
        <div>
            <Text>Usuarios</Text>
            <Button>
                {/* <Link to='/adminEvents'> */}
                Administrar eventos
                {/* </Link> */}
            </Button>
            <Grid
                columns={[1]}
                sx={{ justifyContent: 'stretch', my: '50px', rowGap: '100px', columnGap: '50px' }}
            >
                {usersList}
            </Grid>
        </div>
    )
}

export default UsersList
