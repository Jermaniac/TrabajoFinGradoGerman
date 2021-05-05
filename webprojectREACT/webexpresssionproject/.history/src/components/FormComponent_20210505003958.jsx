import { useState } from 'react';
import ImageUploadService from '../services/image-upload.service';

const defautlImageUrl = "assets/images/blankPhoto.png";

function FormComponent({ changeExpressions}) {

  const [getPhotoFile, setPhotoFile] = useState();
  const [getPhotoUrl, setPhotoUrl] = useState(defautlImageUrl);

  const selectPhoto = (event) => {
    setPhotoFile(event.target.files[0]);
    setPhotoUrl(URL.createObjectURL(event.target.files[0]));
    // changePhoto(event.target.files[0]);
  };

  const requestPredict = () => {
    ImageUploadService.getMood(getPhotoFile).then((response) => {
      if (response) {
        console.log("Call API success!");
        changeExpressions(response.expressions);
      } else {
        console.log("Call API failed.");
      }
    });
  };

  return (
    <div className="col-12 col-md-4 col-lg-3" id="form">
      <div className="row">
        <h2>Upload the photo you want to be predicted</h2>
      </div>
      <div className="row">
        <h3>Click on the image</h3>
      </div>
      <div className="row">
        <label htmlFor="photo">
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            style={{ display: "none" }}
            onChange={selectPhoto}
          ></input>
          <img src={getPhotoUrl} alt="blankPic"></img>
        </label>
      </div>
      <div className="row">
        <button id="buttonSubmit" onClick={requestPredict}>
          PREDICT THIS PHOTO
        </button>
      </div>
    </div>
  );
}

export default FormComponent;