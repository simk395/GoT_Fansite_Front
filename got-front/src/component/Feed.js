import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Feed extends Component {
  render() {
      const { posts, profiles } = this.props
      let postArr = []
      const recentPosts = posts.slice(Math.max(posts.length - 5, 0)).reverse()
      for(let i = 0; i < recentPosts.length; i++){
        let profile = profiles.find(profile => recentPosts[i].user_id === profile.id)
        const body = <div >
                      <Link to={`/forum/${recentPosts[i].category_id}/${recentPosts[i].id}`}>{recentPosts[i].title}</Link>
                      <p>By {profile ? <Link to={`/profile/${profile.username}`}>{profile.username}</Link> : "Anonymous"}</p>
                      <p>Posted: {recentPosts[i].created_at}</p>
                    </div>;
        i % 2 === 0 ? postArr.push( <li className="fb_body odd">{ body }</li>) : postArr.push(<li className="fb_body even">{ body } </li>)
      }
    return (
      <div className="feed_main">
        <h4>Most Recent Posts</h4>
        {postArr.map(post => post)}
      </div>
    )
  }
}

export default Feed
