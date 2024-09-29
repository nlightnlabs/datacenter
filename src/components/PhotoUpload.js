import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useRef} from 'react'
import * as iconsApi from "../apis/icons"
import * as nlightnApi from "../apis/nlightn"


const PhotoUpload = (props) => {

  const onChange = props.onChange

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
    updateParent(file)
  };

  const updateParent = (file)=>{
    const target = {
        photo_file: file
    }
    if (typeof onChange ==="function"){
        onChange({target})
    } 
  }

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex align-items-center w-100 mb-3" style={{height:"60px", fontSize:"14px"}}>
      <div 
        className="btn btn-outline-secondary" 
        onClick={handleDivClick} 
        style={{ cursor: 'pointer', border: "1px solid rgb(225,225,225)", fontSize:"14px"}}
        >
        Profile Photo
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {previewUrl && 
        <div className="d-flex ms-3" style={{height:"100%"}}>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
        </div>
        }
    </div>
  );
};

export default PhotoUpload;
