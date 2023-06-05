import { Link } from "react-router-dom";
import { useState } from "react";
import './Signin.css'

export default function Signin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validationColor, setValidationColor] = useState({usernameLength: false, passwordLength: false, passwordChars: false});
  const [message, setMessage] = useState();
  const [messageColor, setMessageColor] = useState();

  function submitHandle(e) {
    e.preventDefault();

    fetch("http://localhost:2000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      )
    }).then(response => response.json())
    .then(data => {
      if(data.success) {
        setMessage(`Hi ${username}, please login`);
        setTimeout( () => setMessage(<></>), 1500);
        setMessageColor("green");
        return;
      }
      if (data?.message) {
        setMessage(`Invalid credentials`);
        setTimeout( () => setMessage(<></>), 1500);
        setMessageColor("red");
        return;
      }
      setMessage(`${username} already exists`);
      setTimeout( () => setMessage(<></>), 1500);
      setMessageColor("red");
    })
  }

  function usernameValidation(e) {
    setUsername(e.target.value);
    const val = e.target.value;
    if (val.length < 4 || val.length > 20) {
      setValidationColor({...validationColor, usernameLength: false});
    }
    else {
      setValidationColor({...validationColor, usernameLength: true});
    }
  }

  function passwordValidation(e) {
    setPassword(e.target.value);
    const val = e.target.value;
    if (val.length < 8 || val.length > 15) {
      if (/^[a-z0-9]+$/i.test(val)) {
        setValidationColor({...validationColor, passwordLength: false, passwordChars: false});
      }
      else {
        setValidationColor({...validationColor, passwordLength: false, passwordChars: true});
      }
    }
    else {
      if (/^[a-z0-9]+$/i.test(val)) {
        setValidationColor({...validationColor, passwordLength: true, passwordChars: false});
      }
      else {
        setValidationColor({...validationColor, passwordLength: true, passwordChars: true});
      }
    }
  }

  return (
      <>
        <h2 className="signinTitle">Welcome to Chat Room</h2>
        <h3 className="signinSubtitle">Sign-in</h3>
        <form className="signinForm" onSubmit={submitHandle}>
          <input className="signinItem" type="text" placeholder="username" name="username" onChange={usernameValidation} />
          <input className="signinItem" type="password" placeholder="password" name="password" onChange={passwordValidation}/>
          <input className="signinItem signinButton" type="submit" value="Sign-in"
          disabled={!validationColor.passwordChars && validationColor.passwordLength && validationColor.usernameLength}
          style={{opacity: validationColor.passwordChars && validationColor.passwordLength && validationColor.usernameLength ? 1 : 0.5}} />
        </form>
        <div className="validationContainer">
          <div className="validationItem" style={{color: validationColor.usernameLength ? "green" : "red"}}>Username between 4 and 20 characters long.</div>
          <div className="validationItem" style={{color: validationColor.passwordLength ? "green" : "red"}}>Password between 8 and 15 characters long.</div>
          <div className="validationItem" style={{color: validationColor.passwordChars ? "green" : "red"}}>Password with at least one capital letter and one non-alphanumeric character.</div>
        </div>
        <div className="loginContainer"><Link className="signin" to="/">Login</Link></div>
        <p className="signinMessage" style={{backgroundColor: messageColor}}>{message}</p>
      </>
  );
}
