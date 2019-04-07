import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/forum">Forum</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
    )
  }
}

export default Navbar
