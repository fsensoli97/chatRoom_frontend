import { useState } from "react";
import './Send.css'
import { serverUrl } from "../../global";

export default function Send({user}) {
  let [message, setMessage] = useState("");

  function handleClick(event) {
    try {
      fetch(`${serverUrl}messages`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "user": user,
            "text": message
          })
      });
      setMessage("");
    }
    catch (error) {
      console.log("Error: " + error);
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
    //console.log(message);
  }
 
  return(
    <div className="sendContainer">
      <textarea cols={40} rows={3} className="inputMessage" value={message} onChange={handleChange}></textarea>
      <button className="sendButton" disabled={message === ""} onClick={handleClick}>Send</button>
    </div>
  )
      
}