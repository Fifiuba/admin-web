import React, {useState} from 'react';
import getusers from '../services/get-users'

function Home() {
    const [users, setUsers] = useState(null);
    return (
        <div>
            <h1>Admin</h1>
            <button onClick={()=> setUsers(getusers())}>Get users</button>
            <ul>{users && users.map((user, idx) => <li key={idx}>Nombre:{user.name} </li>)}</ul>
        </div>
  )
}

export default Home