import ImageUploadService from '../services/image-upload.service';

function FormComponent({ changeExpressions }){

    const selectPhoto = (event) => {
        this.setState ({
          photoFile: event.target.files[0],
          photoURL : URL.createObjectURL(event.target.files[0])
        });
      }
    
    const requestPredict = () => {
        ImageUploadService.getMood(this.state.photoFile)
        .then ( (response) => {
          if (response){
            console.log("Call API success!");
            this.props.changeExpression(response.expressions);
          }
          else {
            console.log("Call API failed.")
          }
        });
      }
    return (
      <div>
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
              onChange={this.selectPhoto}
            ></input>
            <img src={this.state.photoURL} alt="blankPic"></img>
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