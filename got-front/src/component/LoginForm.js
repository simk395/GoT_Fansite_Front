import React, { Component } from 'react'
import { Adapter } from '../Adapter'

export class LoginForm extends Component {
    state = {
        username: '',
        password: ''
      }
      
  handleInput = event => {
    this.setState({[event.target.name]: event.target.value});
  }

      handleLogin = event => {
        event.preventDefault();
        const userObj = {
          username: this.state.username,
          password: this.state.password
        };
        this.getUserObj(userObj);
      }
      getUserObj = userObj => {
        fetch('http://localhost:3000/api/v1/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userObj)
        })
          .then(resp => resp.json())
          .then(userObj => this.props.setLogin(userObj));
      }
      
      render () {
        return (
          <div className="form-container">
            <form className="the-form" onSubmit={this.handleLogin}>
              <label className="form-label">Log in:</label> 
              <br/>
              <input className="form-input" placeholder="Username" autoComplete="off" type="text" name="username" value={this.state.username} onChange={this.handleInput} />
              <br/>
              <label className="form-label">Password:</label>
              <br/>
              <input className ="form-input" placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.handleInput} />
              <br/>
              <input className="form-submit" type="submit" value="Login" />
            </form>
         </div>
        )
      }
    
}

export default LoginForm
