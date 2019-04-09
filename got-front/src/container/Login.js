import React, { Component } from 'react'
import LoginForm from '../component/LoginForm'

export class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm setLogin={this.props.setLogin} />
      </div>
    )
  }
}

export default Login
