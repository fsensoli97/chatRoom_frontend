import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import './Profile.css';
import { useEffect } from "react";
import { useRef } from "react";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [cropAvatar, setCropAvatar] = useState(null);
  const [filter, setFilter] = useState({x: null, y: null, draggable: false});
  const canvasRef = useRef(null);

  function handleFileChoose(e) {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  }

  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e) {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.stopPropagation();
    e.preventDefault();
  }
  
  function onMouseMove(e) {
    const pos = document.getElementById('filterImage').getBoundingClientRect();
    setFilter({x: e.pageX - pos.width/2, y: e.pageY - pos.height/2, draggable: true});
    e.stopPropagation();
    e.preventDefault();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = avatar;
    image.onload = function(){
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    }
  }, [avatar]);


  function cropImage() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let canvas1 = document.createElement("canvas");

    let ctx1 = canvas1.getContext("2d");
    /*
    ctx1.rect(0, 0, 200, 200);
    ctx1.fillStyle = 'white';
    ctx1.fill();
    */
    ctx1.putImageData(imageData, 0, 0, filter.x, filter.y, 200, 200);

    setCropAvatar(canvas1.toDataURL("image/png"));
    /*
    const pos = document.getElementById('filterImage').getBoundingClientRect();
    const canvas = cropCanvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = avatar;
    image.onload = function(){
      context.drawImage(image, filter.x * image.width / canvas.width, filter.y * image.height / canvas.height, 200, 200, 0, 0, canvas.width, canvas.height);
    }
    */

  }

  return (
    <>
      <div id="avatarContainer">
        {avatar? <div style={{left: filter.x, top: filter.y}} id="filterImage" className="imageFilter" onMouseDown={onMouseDown}></div> : null}
        <Link to="/"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Link>
        <form>
          <input type="file" onChange={handleFileChoose}></input>
        </form>
        <canvas style={{width: "100%"}} ref={canvasRef} className="avatarContainer">
          <img className="avatar" src={avatar} alt=""></img>
        </canvas>

        <img src={cropAvatar} alt=""></img>
        
      </div>

      <button onClick={cropImage}>Crop Image</button>
    </>
  );
}