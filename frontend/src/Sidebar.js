import React from 'react'

const Sidebar = ({ users }) => (
    <aside>
        <h4 className="users-heading">Online Users</h4>
        <ul>
            {users.map(user => {
                return (
                    <li key={user}
                        className="user-list-item">{user}</li>
                )
            })
            }
        </ul>
    </aside>
);
export default Sidebar;