import './Message.css'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Message({id, user, text, date, sameUser}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMsg, setEditMsg] = useState(text);
  const editInput = useRef(null);

  function editMessage() {
    setIsEditing(true);
  }

  function updateMsg() {
    setIsEditing(false);
    fetch(`http://localhost:2000/editMessage?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(
        {
          text: editMsg
        }
      )
    });
  };

  function deleteMessage() {
    fetch(`http://localhost:2000/deleteMessage?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
  }
  
  function handleClickOutside(e) {
    if (editInput.current && !editInput.current.contains(e.target)) {
      setIsEditing(false);
      setEditMsg(text);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isEditing]);

  //const tmp = new Date();
  //const timestamp = `${('00' + tmp.getHours()).slice(-2)}:${('00' + tmp.getMinutes()).slice(-2)}`;
  const timestamp = date.split('T')[1].split('.')[0];

  return (
    <div ref={editInput} className='messageContainer' style={{float: sameUser ? "right" : "left"}}>
      {sameUser ? <div className='messageButtons'>
        <FontAwesomeIcon className='editButton' icon={faPencil} onClick={editMessage}>edit</FontAwesomeIcon>
        <FontAwesomeIcon className='deleteButton' icon={faX} onClick={deleteMessage}>delete</FontAwesomeIcon>
        </div> : <></>}
      
      <div className="userMessage">{user}</div>
      {isEditing ? <><input className='editInput' type='text' value={editMsg} onChange={e => setEditMsg(e.target.value)}></input><FontAwesomeIcon className='editConfirmButton' icon={faCheck} disabled={editMsg===""} onClick={updateMsg}></FontAwesomeIcon></> : <div className="textMessage">{text}</div>}
      <div className="dateMessage">{timestamp}</div>
    </div>
  );
}