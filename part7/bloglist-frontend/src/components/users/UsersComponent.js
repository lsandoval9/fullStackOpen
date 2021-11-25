import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import usersActions from '../../store/users/actions/usersActions'

function Users() {

    const users = useSelector(state => state.users)

    

    return (
        <>
            <table className="table table-bordered table-hover table-info">
                <thead>
                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            Blogs created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (

                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
