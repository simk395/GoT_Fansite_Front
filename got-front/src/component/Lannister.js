import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PostCreate from './PostCreate'

export class Lannister extends Component {
  render() {
      const {match, posts, id} = this.props
      const lanPosts = posts.filter(post => post.category_id === id);
    return (
      <div className="forum__posts">
        <ul className="forum__posts__lists">
          {lanPosts.map(post => <li className="forum__posts__items"><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li> )}
          <Link to={`/create/${id}`}>Create a Post</Link> 
        </ul>
      </div>
    )
  }
}

export default Lannister
