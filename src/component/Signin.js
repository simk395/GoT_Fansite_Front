import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export class Signin extends Component {

  state = {
    username: '',
    password: ''
  }

  handleInput = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleLogin = event => {
    event.preventDefault();
    if(event.target === document.querySelector(".account_submit")){
    const userObj = {
      username: this.state.username,
      password: this.state.password
    };
    this.getUserObj(userObj);
    }
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
      
  render() {
    return (
        <Modal
        {...this.props}
        className="account_main"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="account_header" closeButton>
          <Form className="account_form">
          <h4>Log In</h4>
            <Form.Group className="account_group" controlId="formBasicUser">
              <Form.Control 
                className="account_username"
                type="text" 
                placeholder="Username" 
                autoComplete="off" 
                name="username" 
                value={this.state.username} 
                onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group className="account_group" controlId="formBasicPassword">
              <Form.Control 
                className="account_password"
                type="password" 
                placeholder="Password"
                name="password" 
                value={this.state.password}
                onChange={this.handleInput}/>
            </Form.Group>
            <Button onClick={this.handleLogin} className="account_submit" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Header>
      </Modal>
    )
  }
}

export default Signin
