import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    const countDownDate = new Date("Apr 14, 2019 21:00:00").getTime();
    const x = setInterval(function() {
      const now = new Date().getTime();
    
      // Find the distance between now and the count down date
      const distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
    
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "WATCH IT NOW ON HBO";
      }
    }, 1000);
    return (
      <nav className="navbar">
        <NavLink to="/landing">Home</NavLink>
        <NavLink to="/forum">Forum</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/logout">Logout</NavLink>
        <span id="demo"></span>
        <span id="winter">Winter is Coming!</span>
      </nav>
    )
  }
}

export default Navbar
