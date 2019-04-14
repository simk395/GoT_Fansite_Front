import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export class Signup extends Component {
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

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Username" 
                autoComplete="off" 
                name="username" 
                value={this.state.username} 
                onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                placeholder="Password"
                name="password" 
                value={this.state.password}
                onChange={this.handleInput}/>
            </Form.Group>
            <Button onClick={this.handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Header>
      </Modal>
    )
  }
}

export default Signup
