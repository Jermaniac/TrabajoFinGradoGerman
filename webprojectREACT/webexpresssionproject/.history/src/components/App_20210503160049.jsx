import React from 'react'
import ImageUploadService from '../services/image-upload.service';

import InfoExpressions from './InfoComponent'

import '../styles/App.css'
import { changeExpressions } from '../redux/actionCreators';

import { connect } from 'react-redux'
import FormComponent from './FormComponent';

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
              <FormComponent></FormComponent>
            </div>
            <div className="col-12 col-md-8 col-lg-9" id="info">
              <InfoExpressions  expressions={this.props.expressions} ></InfoExpressions>
            </div>
          </div>
        </div>
    );
  }
}

export default ( connect ( mapStateToProps, mapDispatchToProps )( App ))