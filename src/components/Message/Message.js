import './Message.css'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

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

  const tmp = new Date();
  const timestamp = `${('00' + tmp.getHours()).slice(-2)}:${('00' + tmp.getMinutes()).slice(-2)}`;

  return (
    <div ref={editInput} className='messageContainer' style={{float: sameUser ? "right" : "left"}}>
      {sameUser ? <>
        <button onClick={editMessage}>edit</button>
        <button onClick={deleteMessage}>delete</button>
        </> : <></>}
      
      <div className="userMessage">{user}</div>
      {isEditing ? <><input type='text' value={editMsg} onChange={e => setEditMsg(e.target.value)}></input><button disabled={editMsg===""} onClick={updateMsg}>ok</button></> : <div className="textMessage">{text}</div>}
      <div className="dateMessage">{timestamp}</div>
    </div>
  );
}