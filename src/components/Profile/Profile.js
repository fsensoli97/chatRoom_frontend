import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import './Profile.css';
import { useEffect } from "react";
import { useRef } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { serverUrl } from "../../global";

export default function Profile({ id }) {
  const [img, setImg] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [blob, setBlob] = useState(null);

  function handleFileChoose(e) {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  }

  function getCroppedImg() {
    const image = new Image();
    image.src = img;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    //console.log(canvas.width, canvas.height, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height)
    
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height);
  
    const canvas2 = document.createElement("canvas");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = croppedAreaPixels.width;
    canvas2.height = croppedAreaPixels.height;
    ctx2.putImageData(data, 0, 0);
  
    canvas2.toBlob((file) => {
      setBlob(file);
      setCroppedImage(URL.createObjectURL(file), "image/jpeg");
    });
  }

  function saveImage() {
    if (!blob) return;

    const formData = new FormData();
    formData.append("profilePic", blob);

    fetch(`${serverUrl}profilepic?id=${id}`, {
        method: "PUT",
        body: formData,
      })
      .then((response) => response.text())
      .then((responseText) => {
      console.log(responseText);
      });
      console.log(blob)
  }

  return (
    <>
      <Link to="/"><FontAwesomeIcon className="backArrow" size="2x" icon={faArrowLeft}></FontAwesomeIcon></Link>
      <form>
        <div className="chooseButtonContainer">
          <label className="chooseFileButton">
            <input type="file" onChange={handleFileChoose}></input>
            Choose file
          </label> 
        </div>   
      </form>
      {img ? <>
      <div className="cropperContainer">
        <Cropper classes={{ containerClassName: "cropper", mediaClassName: "mediaContainer", cropAreaClassName: "areaContainer" }} image={img} crop={crop} onCropChange={setCrop} cropShape="round" aspect={1/1}
        zoom={zoom} zoomSpeed={4} maxZoom={3} zoomWithScroll={true} showGrid={true} onZoomChange={setZoom} onCropComplete={(croppedArea, croppedAreaPixels) => {setCroppedAreaPixels(croppedAreaPixels)}}></Cropper></div>
        <div className="sliderContainer"><Slider sx={{color: "white"}} value={zoom} min={1} max={3} step={0.01} onChange={(e, zoom) => setZoom(zoom)}></Slider></div>
      <div className="cropButtonContainer"><button className="cropButton" onClick={getCroppedImg}>Crop</button></div>
      <div className="screenshotContainer"><img className="screenshot" src={croppedImage} alt="crop"></img></div>
      <div><button onClick={saveImage}>Done</button></div></>  : <></>}
    </>
  );
}