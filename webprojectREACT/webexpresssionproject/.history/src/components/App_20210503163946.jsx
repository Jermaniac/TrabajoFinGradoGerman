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
  changeExpressions: (expressions) => dispatch(changeExpressions(expressions))
});

class App extends React.Component {

  render () {
    return (
        <div className="container">
          <div className="row">
              <FormComponent changeExpressions={this.props.changeExpressions}></FormComponent>
              <InfoExpressions  expressions={this.props.expressions} ></InfoExpressions>
          </div>
        </div>
    );
  }
}

export default ( connect ( mapStateToProps, mapDispatchToProps )( App ))