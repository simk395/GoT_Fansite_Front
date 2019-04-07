import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class General extends Component {
  render() {
      const {match, posts, id} = this.props
      const genPosts = posts.filter(post => post.category_id === id)
    return (
      <div className="forum__posts">
        <ul className="forum__posts__lists">
          {genPosts.map(post => <li className="forum__posts__items"><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li> )}
        </ul>
      </div>
    )
  }
}

export default General
