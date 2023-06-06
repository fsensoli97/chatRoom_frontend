import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import './OnlineUser.css'

export default function OnlineUser({username, isOnline}) {
    return (
        <div className="userContainer">
            <FontAwesomeIcon className="onlineIcon" icon={faCircle} style={{color: isOnline ? "green" : "gray"}}></FontAwesomeIcon>
            <span>{username}</span>
        </div>
    );
}