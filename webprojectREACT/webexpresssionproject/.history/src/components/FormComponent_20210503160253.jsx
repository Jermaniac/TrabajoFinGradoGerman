
function FormComponent({ changeExpressions }){

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
          <button id="buttonSubmit" onClick={this.requestPredict}>
            PREDICT THIS PHOTO
          </button>
        </div>
      </div>
    );
}

export default FormComponent;