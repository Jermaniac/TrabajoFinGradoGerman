import React from 'react'

import InfoExpressions from './InfoComponent'

import '../styles/App.css'
import { changeExpressions } from '../redux/actionCreators';

import { connect } from 'react-redux'
import FormComponent from './FormComponent';

const mapStateToProps = state => {
  return {
    expressions: state.expressions
  }
};

const mapDispatchToProps = dispatch => ({
  changeExpression: (expressions) => dispatch(changeExpressions(expressions))
});

class App extends React.Component {

  render () {

    return (
        <div className="container">

          <div className="row">

            <div className="col-12 col-md-4 col-lg-3" id="form">
              <FormComponent changeExpressions={this.props.changeExpression}></FormComponent>
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