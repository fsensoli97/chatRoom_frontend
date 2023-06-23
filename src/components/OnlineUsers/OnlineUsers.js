import { useEffect } from "react";
import { useState } from "react";
import OnlineUser from "../OnlineUser/OnlineUser";
import './OnlineUsers.css'
import { serverUrl } from "../../global";

export default function OnlineUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${serverUrl}users`)
        .then(response => {return response.json();})
        .then(data => {
            const content = data.map((row) => {
                if (!row.isverified) return <div key={row.id}></div>;
                return <OnlineUser key={row.id} id={row.id} username={row.username} isOnline={row.isonline}></OnlineUser>;
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