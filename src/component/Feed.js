import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import 'moment-timezone';


export class Feed extends Component {
  render() {
      const { posts, profiles } = this.props
      const recentPosts = posts.slice(Math.max(posts.length - 7, 0)).reverse()
      const appendPosts = recentPosts.map(post => {
        let profile = profiles.find(profile => post.user_id === profile.id);
        const body = <div key={post.id} className="feed_body">
                        <Link className="feed_title" to={`/forum/${post.category_id}/${post.id}`}>{post.title}</Link>
                        <p className="feed_author">By {profile ? <Link to={`/profile/${profile.username}`}>{profile.username}</Link> : "Anonymous"}</p>
                        <p>Posted: <Moment format="LLL">{post.created_at}</Moment></p>
                    </div>;
        return body;
      })
    return (
      <div className="feed_main">
        <h2 className="feed_heading">Most Recent Posts</h2>
        {appendPosts}
      </div>
    )
  }
}

export default Feed
