import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Signin from '../component/Signin'
import Signup from '../component/Signup'

export class Navigation extends Component {
  state = {
    time: {},
    signin: false,
    signup: false
  }
  
  componentDidMount(){
   setInterval(this.countdown, 1000)
  }

  countdown = () => {
    const countDownDate = new Date("Apr 14, 2019 21:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const time = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds
    };
    this.setState({time: time})
  }

  modalClose = () => {
    this.setState({ signin: false, signup:false });
  }

  render() {
    const activeUser = localStorage.token
    const { setLogin, handleSignUp, handleLogout} = this.props
    const { user } = this.props.user
    const { time } = this.state
    const countdown = <Nav.Item className="nav_countdown" as="li"><Nav.Link>{time.d}D {time.h}H {time.m}M {time.s}S</Nav.Link></Nav.Item>
    return (
      <Navbar className="nav" bg="dark" variant="dark" sticky="top">
        <Nav className="nav_list" as="ul">
          <Nav.Item  className="nav_item" as="li">
            <Nav.Link> 
              <NavLink className="nav_link" to="/">
                Home
              </NavLink>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav_item" as="li">
            <NavDropdown className="nav_community" title="Community">
              <NavDropdown.Item>
                <NavLink className="nav_link" to="/forum">Forum</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
        {
        !activeUser ?
        <Nav className="nav_user" as="ul">
        {countdown}
          <Nav.Item className="nav_item" as="li">
            <Nav.Link>
                <button onClick={() => this.setState({ signin: true })} className="nav_btn login">LOG IN</button>
                <Signin setLogin={setLogin} show={this.state.signin} onHide={this.modalClose}/>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav_item" as="li">
            <Nav.Link>
                <button onClick={() => this.setState({ signup: true })} className="nav_btn signup">SIGN UP</button>
                <Signup handleSignUp={handleSignUp} show={this.state.signup} onHide={this.modalClose}/>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        :
        <Nav className="nav_user" as="ul">
        {countdown}
          <Nav.Item className="nav_item" as="li">
            <NavDropdown className="nav_account" title="My Account">
              <NavDropdown.Item>
                  <NavLink to={user ? `/profile/${user.username}` : "#"}>My Profile</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                  <NavLink to="/signout">Sign Out</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
        }
      </Navbar>
      )
    }
  }
  
export default Navigation
