import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Adapter } from '../Adapter'

export class Category extends Component {
  render() {
    return (
      <ul className="categories">
        <li><Link className="category__item" to="/forum/1">General</Link></li>
        <li><Link className="category__item" to="/forum/2">Stark</Link></li>
        <li><Link className="category__item" to="/forum/3">Baratheon</Link></li>
        <li><Link className="category__item" to="/forum/4">Targaryen</Link></li>
        <li><Link className="category__item" to="/forum/5">Lannister</Link></li>
        <li><Link className="category__item" to="/forum/6">Other Houses</Link></li>
        <li><Link className="category__item" to="/forum/7">Off-Topic Discussion</Link></li>
      </ul>
    )
  }
}

export default Category
