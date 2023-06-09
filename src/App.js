import React from "react";
import Send from "./components/Send/Send";
import { useState } from "react";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Logout from "./components/Logout/Logout";
import Chat from "./components/Chat/Chat";
import './index.css'
import './App.css'
import Menu from "./components/Menu/Menu";
import Profile from "./components/Profile/Profile";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";

function setTokenSession(token) {
  sessionStorage.setItem("token", JSON.stringify(token));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const token = JSON.parse(tokenString);
  return token;
}

function App() {
  const [token, setToken] = useState(getToken());
  
  if (!token?.success) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken = {setToken} setTokenSession = {setTokenSession}></Login>}></Route>
          <Route path="/signin" element={<Signin setToken = {setToken} setTokenSession = {setTokenSession}></Signin>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <h3 className="welcomeUser">Welcome {token.username + "!"}</h3>
              <div className="chatUsersContainer">
                <div className="chatBlock">
                  <Chat user={token.username}></Chat>
                </div>
                <div className="usersBlock">
                  <OnlineUsers></OnlineUsers>
                </div>
              </div>
              <Send user={token.username}></Send>
              <Logout setToken={setToken} id={token.id}></Logout>
              <Menu></Menu>
            </>
          }>           
          </Route>
          <Route path="/profile" element={<Profile id={token.id}></Profile>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
