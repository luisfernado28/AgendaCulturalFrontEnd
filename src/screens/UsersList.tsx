import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Status } from "../redux/types"
import { fetchUsers, selectAllUsers } from "../redux/usersSlice"

function UsersList(): JSX.Element {
    const dispatch = useDispatch()
    const { users, status } = useSelector(selectAllUsers)
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    if(status== Status.SUCCEEDED)
        console.log(users);
    return (
        <div>

        </div>
    )
}

export default UsersList
