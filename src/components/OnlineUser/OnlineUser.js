import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import './OnlineUser.css'
import { useState, useEffect } from "react";

export default function OnlineUser({id, username, isOnline}) {
    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        console.log(id)
        fetch(`http://localhost:2000/profilePic?id=${id}`)
        .then(async (response) => {
            if (!response) return;
            const file = await response.blob();
            setProfilePic(URL.createObjectURL(file));
        });
    }, []);

    return (
        <div className="userContainer">
            <div className="profilePicContainer"><img className="profilePic" src={profilePic} style={{border: isOnline ? "solid 3px green" : "solid 3px gray"}} alt=""></img><span>{username}</span></div>
            {/* 
            <FontAwesomeIcon className="onlineIcon" icon={faCircle} style={{color: isOnline ? "green" : "gray"}}></FontAwesomeIcon>
            <span>{username}</span>
            */}
        </div>
    );
}