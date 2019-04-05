import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Baratheon extends Component {
  render() {
      const {match, posts, id} = this.props
      const barPosts = posts.filter(post => post.category_id === id)
    return (
      <div>
        <ul>
          {barPosts.map(post => <li><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li> )}
        </ul>
      </div>
    )
  }
}

export default Baratheon

