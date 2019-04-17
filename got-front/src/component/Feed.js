import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Feed extends Component {
  render() {
      const { posts, profiles } = this.props
      let postArr = []
      const recentPosts = posts.slice(Math.max(posts.length - 7, 0)).reverse()
      for(let i = 0; i < recentPosts.length; i++){
        let profile = profiles.find(profile => recentPosts[i].user_id === profile.id)
        const body = <div className="feed_body">
                      <Link className="feed_title" to={`/forum/${recentPosts[i].category_id}/${recentPosts[i].id}`}>{recentPosts[i].title}</Link>
                      <p className="feed_author">By {profile ? <Link to={`/profile/${profile.username}`}>{profile.username}</Link> : "Anonymous"}</p>
                      <p>Posted: {recentPosts[i].created_at}</p>
                    </div>;
        postArr.push(<li className="feed_body_list">{ body } </li>)
      }
    return (
      <div className="feed_main">
        <h2 className="feed_heading">Most Recent Posts</h2>
        {postArr.map(post => post)}
      </div>
    )
  }
}

export default Feed
