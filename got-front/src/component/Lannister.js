import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import PostCreate from './PostCreate'

export class Lannister extends Component {
  render() {
      const {match, posts, id} = this.props
      const lanPosts = posts.filter(post => post.category_id === id);
    return (
      <div className="fb_main">
        <ul className="fb_list">
          {lanPosts.map(post => 
          post.id % 2 === 0 ?
          <li className="fb_body odd">
            <div className="fb_desc">
            <Link className="fb_title" to={`${match.url}/${post.id}`}>{post.title}</Link>
            <p className="fb_subtitle">By</p>
            </div>
          </li> 
          :
          <li className="fb_body even">
          <div className="fb_desc">
            <Link className="fb_title" to={`${match.url}/${post.id}`}>{post.title}</Link>
            <p className="fb_subtitle">By</p>
          </div>
          </li> )}
          <Link to={`/create/${id}`}>Create a Post</Link> 
        </ul>
      </div>
    )
  }
}

export default withRouter(Lannister)
