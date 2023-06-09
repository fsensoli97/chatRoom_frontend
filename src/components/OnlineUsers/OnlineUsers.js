import { useEffect } from "react";
import { useState } from "react";
import OnlineUser from "../OnlineUser/OnlineUser";
import './OnlineUsers.css'

export default function OnlineUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2000/users")
        .then(response => {return response.json();})
        .then(data => {
            const content = data.map((row) => {
                return <OnlineUser key={row.id} id={row.id} username={row.username} isOnline={row.isOnline}></OnlineUser>
            });
            setUsers(content);
        });
    }, []);

    return (
        <div className="usersContainer">
            {users}
        </div>
    );
}