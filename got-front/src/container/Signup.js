import React, { Component } from 'react'
import SignupForm from '../component/SignupForm'

export class Signup extends Component {
  render() {
    return (
      <div>
        <SignupForm handleSignUp={this.props.handleSignUp}/>
      </div>
    )
  }
}

export default Signup
