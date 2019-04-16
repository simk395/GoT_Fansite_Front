import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { Adapter } from '../Adapter'
import PostCreate from './PostCreate'
import Post from './Post'

export class Lannister extends Component {

  state = {
    profiles: []
  }
  componentDidMount(){
    Adapter.getUser().then(profiles => this.setState({profiles:profiles}))
  }
  render() {
      let postArr = []
      const {match, posts, id, user} = this.props
      const { profiles } = this.state
      const lanPosts = posts.filter(post => post.category_id === id);
      for(let i = 0; i < lanPosts.length; i++){
        let profile = profiles.find(profile => lanPosts[i].user_id === profile.id);
        const body = <div className="fb_desc">
                      <Link className="fb_title" to={`${match.url}/${lanPosts[i].id}`}>{lanPosts[i].title}</Link>
                      <p className="fb_subtitle">By {profile ? <Link to={`/profile/${profile.username}`}>{profile.username}</Link> : "Anonymous"}</p>
                    </div>;
        i % 2 === 0 ? postArr.push( <li className="fb_body odd">{ body }</li>) : postArr.push(<li className="fb_body even">{ body } </li>)
      }
    return (
      <div className="fb_main">
      <div className="fb_heading">
        <h1> Lannister</h1>
        <Link className="fb_create" to={`/create/${id}`}>Create Topic</Link> 
      </div>
        <ul className="fb_list">
        {postArr.map(post => post)}
        </ul>
      </div>
    )
  }
}

export default withRouter(Lannister)
