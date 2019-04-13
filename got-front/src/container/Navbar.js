import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import banner from '../images/banner.jpg'
import { StickyContainer, Sticky } from 'react-sticky';


export class Navbar extends Component {
  state = { 
    activeItem: 'home' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    // const countDownDate = new Date("Apr 14, 2019 21:00:00").getTime();
    // const x = setInterval(function() {
    //   const now = new Date().getTime();
    
    //   // Find the distance between now and the count down date
    //   const distance = countDownDate - now;
    
    //   // Time calculations for days, hours, minutes and seconds
    //   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    //   // Display the result in the element with id="demo"
    //   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    //   + minutes + "m " + seconds + "s ";
    
    //   // If the count down is finished, write some text 
    //   if (distance < 0) {
    //     clearInterval(x);
    //     document.getElementById("demo").innerHTML = "WATCH IT NOW ON HBO";
    //   }
    // }, 1000);

    const { activeItem } = this.state
    const activeUser = localStorage.token
    return (
      <nav className="nav">

        <img className="nav_banner" src={banner}></img>
        <div className="nav-container">
        <div className="nav_secondary">
        <ul className="nav_secondary_list">
          <li ><NavLink className="nav_item" to="/landing">Home
          </NavLink></li>
          <li ><NavLink className="nav_item" to="/forum">
            Forum
          </NavLink></li>
          </ul>
        </div>
        {!activeUser ? 
        <div className="nav_user">
          <ul className="nav_user_list">
            <li> <NavLink className="nav_item" to="/login">
            <button className="nav_user_log">LOG IN</button>
            </NavLink></li>
            <li ><NavLink className="nav_item" to="/signup">
            <button className="nav_user_sign">SIGN UP</button>
            </NavLink></li></ul> 
            </div>
            : 
            <div className="nav_user">
            <ul className="nav_user_list"><li ><NavLink className="nav_item" to="/logout">
                <button className="nav_user_log">LOG OUT</button>
              </NavLink></li></ul>
              </div>}
        </div>
        {/* <span id="demo"></span>
        <span id="winter">Winter is Coming!</span> */}
      </nav>
      
    )
  }
}

export default Navbar
