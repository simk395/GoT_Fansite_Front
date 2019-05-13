import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Feed from '../component/Feed'

export class Discussion extends Component {

  state = {
    profiles: [],
    posts: []
  }
  componentDidMount(){
    this.setState({profiles: this.props.profiles})
  }

  render() {
      let postArr = []
      const {match, posts, category, profiles} = this.props
      const { user } = this.props.user
      const topicPosts = posts.filter(post => post.category_id === category.id).reverse();
      for(let i = 0; i < topicPosts.length; i++){
        let profile = profiles.find(profile => topicPosts[i].user_id === profile.id)
        const body = <div className="fb_desc">
                      <Link className="fb_title" to={`${match.url}/${topicPosts[i].id}`}>{topicPosts[i].title}</Link>
                      <p className="fb_subtitle">By {profile ? <Link to={`/profile/${profile.username}`}>{profile.username}</Link> : "Anonymous"}</p>
                    </div>;
        i % 2 === 0 ? postArr.push( <li className="fb_body odd">{ body }</li>) : postArr.push(<li className="fb_body even">{ body } </li>)
      }
    return (
      <div className="fb_main">
      <Feed posts={posts} profiles={profiles}/>
        <div className="fb_heading">
          <h1> {category.title} </h1>
          {user ? <Link className="fb_create" to={`/forum/create/${category.id}`}>Create Topic</Link> : null}
        </div>
          <ul className="fb_list">
            {postArr.map(post => post)}
          </ul>
      </div>
    )
  }
}

export default withRouter(Discussion)
