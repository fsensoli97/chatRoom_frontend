import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [menuVisible, setMenuVisible] = useState(false);

  function handleClick() {
    setMenuVisible(!menuVisible);
  }

  if (menuVisible) {
    return(
      <>
        <FontAwesomeIcon icon={faBars} onClick={handleClick}></FontAwesomeIcon>
        <div>
          <div><Link to="/profile">profile</Link></div>
        </div>
      </>
    );
  }
  else {
    return(
      <>
        <FontAwesomeIcon icon={faBars} onClick={handleClick}></FontAwesomeIcon>
      </>
    );
  }
}
  