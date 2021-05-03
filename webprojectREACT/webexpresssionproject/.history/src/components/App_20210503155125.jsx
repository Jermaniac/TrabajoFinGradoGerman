import React from 'react'
import ImageUploadService from '../services/image-upload.service';

import InfoExpressions from './InfoComponent'

import '../styles/App.css'
import { changeExpressions } from '../redux/actionCreators';

import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    expressions: state.expressions,
  }
};

const mapDispatchToProps = dispatch => ({
  changeExpression: (expressions) => dispatch(changeExpressions(expressions))
});

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      photoFile : undefined,
      photoURL : "assets/images/blankPhoto.png"
      // expressions : null
    };
  }

  selectPhoto = (event) => {
    this.setState ({
      photoFile: event.target.files[0],
      photoURL : URL.createObjectURL(event.target.files[0])
    });
  }

  requestPredict= () => {
    ImageUploadService.getMood(this.state.photoFile)
    .then ( (response) => {
      if (response){
        console.log("Call API success!");
        this.props.changeExpression(response.expressions);
        console.log()
        // this.setState({
        //   expressions : response.expressions
        // }
        // )
      }
      else {
        console.log("Call API failed.")
      }
    });
  }


  render () {

    return (
        <div className="container">

          <div className="row">

            <div className="col-12 col-md-4 col-lg-3" id="form">

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
                <button id="buttonSubmit" onClick={this.requestPredict} >
                  PREDICT THIS PHOTO
                </button>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9" id="info">
              <InfoExpressions  expressions={this.state.changeExpressions} ></InfoExpressions>
            </div>
          </div>
        </div>
    );
  }
}

export default ( connect ( mapStateToProps, mapDispatchToProps )( App ))