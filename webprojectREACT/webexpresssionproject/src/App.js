import './App.css';
import React from 'react'
import ImageUploadService from './services/image-upload.service';

import InfoExpressions from './components/InfoComponent'
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      photoFile : undefined,
      photoURL : "assets/images/blankPhoto.png",
      expressions : null
    };
  }

  selectPhoto = (event) => {
    
    this.setState ({
      photoFile: event.target.files[0],
      photoURL : URL.createObjectURL(event.target.files[0])
    });

  }

  requestPredict= () => {
    ImageUploadService.getMood(this.state.photoFile).then ( (response) => {
      this.setState ( {
        expressions : response.expressions
      })
    })
    .finally(() => {
      console.log("Mood obtained!")
    });
  }

  render () {

    return (
      
        <div className="container">

          <div className="row">

            <div className="col-4">

              <div className="row">
                <h2>Upload the photo you want to be predicted</h2>
              </div>
            
              <div className="row">
                <h3>Click on the image</h3>    
              </div>   
                    
              <div className="row">
                <label htmlFor="photo">
                  <input type="file" name="photo" id="photo" accept="image/*" style={{display:"none"}} onChange={this.selectPhoto}></input>
                  <img src={this.state.photoURL} alt="blankPic"></img>
                </label>
              </div>
            
              <div className="row">
                <button id="buttonSubmit" onClick={this.requestPredict}>
                  PREDICT THIS PHOTO
                </button>
              </div>

            </div>
        
            <div className="col-8">
              <InfoExpressions  expressions={this.state.expressions}></InfoExpressions>
            </div>

          </div>
        </div>
        
    );    
  }
}

export default App;
