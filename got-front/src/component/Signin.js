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
      
  render() {
    return (
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Form >
            <Form.Group controlId="formBasicUser">
              <Form.Control 
                className="username"
                type="text" 
                placeholder="Username" 
                autoComplete="off" 
                name="username" 
                value={this.state.username} 
                onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control 
                className="password"
                type="password" 
                placeholder="Password"
                name="password" 
                value={this.state.password}
                onChange={this.handleInput}/>
            </Form.Group>
            <Button onClick={this.handleLogin} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Header>
      </Modal>
    )
  }
}

{/* <Modal.Body>
  <h4>Centered Modal</h4>
  <p>
    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
    ac consectetur ac, vestibulum at eros.
  </p>
</Modal.Body> */}
{/* <LoginForm setLogin={this.props.setLogin} /> */}
export default Signin
