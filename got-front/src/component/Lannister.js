import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import PostCreate from './PostCreate'
import Post from './Post'

export class Lannister extends Component {

  render() {
      let arr = []
      const {match, posts, id, user} = this.props
      const lanPosts = posts.filter(post => post.category_id === id);
      for(let i = 0; i < lanPosts.length; i++){
        const body = <div className="fb_desc">
                      <Link className="fb_title" to={`${match.url}/${lanPosts[i].id}`}>{lanPosts[i].title}</Link>
                      <p className="fb_subtitle">By</p>
                    </div>;
        i % 2 === 0 ? arr.push( <li className="fb_body odd">{ body }</li>) : arr.push(<li className="fb_body even">{ body } </li>)
      }
    return (
      <div className="fb_main">
        <ul className="fb_list">
        {arr.map(post => post)}
          <Link to={`/create/${id}`}>Create a Post</Link> 
        </ul>
      </div>
    )
  }
}

export default withRouter(Lannister)
