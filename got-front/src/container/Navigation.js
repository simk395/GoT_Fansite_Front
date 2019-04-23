import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Signin from '../component/Signin'
import Signup from '../component/Signup'
import dracarys from "../images/dracarys.png"

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
    const airDates = ["Apr 14, 2019 21:00:00", 
                      "Apr 21, 2019 21:00:00", 
                      "Apr 29, 2019 21:00:00", 
                      "May 6, 2019 21:00:00", 
                      "May 13, 2019 21:00:00",
                      "May 20, 2019 21:00:00"]
    
    const nextEp = airDates.find(dates => (new Date(dates).getTime()) > (new Date().getTime()))
    if(nextEp){
      const countDownDate = new Date(nextEp).getTime();
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
    }else{
      const time = {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      };
    this.setState({time: time})
    }
  }

  modalClose = () => {
    this.setState({ signin: false, signup:false });
  }

  dracarys = () => {
    let audio = new Audio("dracarys_daenerys_.mp3");
    if(!document.querySelector("#dracarys")){
    audio.play();
    this.startFire();
    let line = document.querySelector("main");
    let div = document.createElement("div");
    div.id = "dracarys";
    line.after(div) 
    }
  }

  startFire = () => {
    setTimeout(function(){
      let fire2 = new Audio("fire2.mp3");
      fire2.play();
    },500)
    setTimeout(function(){
      let fire1 = new Audio("fire1.mp3");
      fire1.loop = "true";
      fire1.play();
    },1000)
  }

  render() {
    const chars = ["Starks", "Lannisters", "Targaryens", "White Walkers"]
    const activeUser = localStorage.token
    const { setLogin, handleSignUp, handleLogout} = this.props
    const { user } = this.props.user
    const { time } = this.state
    const countdown = <Nav.Item className="nav_countdown" as="li"><Nav.Link>Season 8 Premiere: {time.d}D {time.h}H {time.m}M {time.s}S</Nav.Link></Nav.Item>
    return (
      <Navbar className="nav" bg="dark" variant="dark" sticky="top">
        <Nav className="nav_list" as="ul">
        <Nav.Item  className="nav_item" as="li">
            <Nav.Link as="div"> 
              <NavLink className="nav_link" to="/story">Story</NavLink>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item  className="nav_item" as="li">
            <Nav.Link as="div"> 
              <NavLink className="nav_link" to="/houses">Great Houses</NavLink>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav_item" as="li">
            <NavDropdown className="nav_account" title="Characters">
              {chars.map(char => 
              <NavDropdown.Item key={char}>
                {char}
              </NavDropdown.Item>)}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Work in Progress
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
          <Nav.Item className="nav_item" as="li">
            <NavDropdown className="nav_community" title="Community">
              <NavDropdown.Item as="div">
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
        <input alt="" className="dracarys_icon" type="image" onClick={this.dracarys} src={dracarys}/>
        {countdown}
          <Nav.Item className="nav_item" as="li">
            <NavDropdown className="nav_account" title="My Account">
              <NavDropdown.Item as="div">
                  <NavLink to={user ? `/profile/${user.username}` : "#"}>My Profile</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                  Sign Out
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
