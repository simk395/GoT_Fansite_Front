import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import banner from '../images/banner.jpg'


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
        <div className="hello">
        <ul className="nav_list">
          <li className="nav_item"><NavLink className="nav_item" to="/landing">Home
          </NavLink></li>
          <li className="nav_item"><NavLink className="nav_item" to="/forum">
            Community
          </NavLink></li>
        </ul>
        {!activeUser ? 
          <ul className="nav_user">
            <li> className="nav_item" <NavLink className="nav_item" to="/login">
              Login
            </NavLink></li>
            <li className="nav_item"><NavLink className="nav_item" to="/signup">
              Signup
            </NavLink></li></ul> 
            : <ul className="nav_user"><li className="nav_item"><NavLink className="nav_item" to="/logout">
                Logout
              </NavLink></li></ul>}
        {/* <span id="demo"></span>
        <span id="winter">Winter is Coming!</span> */}
        </div>
      </nav>
    )
  }
}

export default Navbar
