import React, { Component } from 'react'
import {withRouter } from 'react-router-dom'


export class SignupForm extends Component {
    state = {
        username: '',
        password: ''
      }
    
      handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
      handleSubmit = (event) => {
        event.preventDefault();
        const userObj = {
          username: this.state.username,
          password: this.state.password
        }
        this.postUserObj(userObj);
      }
      postUserObj = (userObj) => {
        fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({user:userObj})
        })
          .then(resp => resp.json())
          .then(json => {
            if (json.error) {
              alert(json.error);
            } else {
              this.props.handleSignUp();
            }
          })
      }
    
      render () {
        return (
          <div className="signup-container">
            <form onSubmit={this.handleSubmit} className="the-form signup-form">
            <label className="form-label">Username:</label> 
              <br/>
              <input className="form-input" placeholder="Username" autoComplete="off" type="username" name="username" value={this.state.username} onChange={this.handleInput} />
              <br/>
              <label className="form-label">Password:</label> 
              <br/>
              <input className="form-input" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleInput} />
              <br/>
              <input className="form-submit" type="submit" value="Sign Up"/>
            </form>
          </div>
        )
      }
}

export default withRouter(SignupForm)
