import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

function User() {

    const id = (useParams()).id

    const users = useSelector(state => state.users);

    const user = users.find(user => user.id == id)

    console.log(user)

    if (user) {

        return (
            <div className="border py-3 px-2">
                <h3>Blogs submitted by {user.username}</h3>

                <ul className="list-group list-group-numbered">
                    {user.blogs.map(blog => (
                        <li className="list-group-item" key={blog.id}>
                            "<Link to={`/blogs/${blog.id}`}>
                                {blog.title}</Link>" by "{blog.author}"
                        </li>
                    ))}
                </ul>

            </div>
        )
    } else {

        return (
            <div>
                Cannot found user with id {id}
            </div>
        )

    }
}

export default User
