import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import './Menu.css'

export default function Menu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const hamburgerMenu = useRef();

  function handleClick() {
    setMenuVisible(!menuVisible);
  }

  function handleClickOutside(e) {
    if (hamburgerMenu.current && !hamburgerMenu.current.contains(e.target)) {
      setMenuVisible(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [menuVisible]);

  if (menuVisible) {
    return(
      <span ref={hamburgerMenu} className="menuContainer">
        <FontAwesomeIcon className="hamburgerMenu" size="2x" icon={faBars} onClick={handleClick}></FontAwesomeIcon>
        <div>
          <div className="menuItem"><Link className="menuLink" to="/profile">profile</Link></div>
        </div>
      </span>
    );
  }
  else {
    return(
      <span ref={hamburgerMenu} className="menuContainer">
        <FontAwesomeIcon className="hamburgerMenu" size="2x" icon={faBars} onClick={handleClick}></FontAwesomeIcon>
      </span>
    );
  }
}
  