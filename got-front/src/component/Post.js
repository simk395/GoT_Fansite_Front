import React, { Component } from 'react'
import Comments from './Comments'
import { Adapter } from '../Adapter'
import {withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import 'emoji-mart/css/emoji-mart.css'
import { Link } from 'react-router-dom'
import { Picker } from 'emoji-mart'

export class Post extends Component{
  state = {
    comments: [],
    newComment: "",
    profiles: [],
    emoji: false
  }

  componentWillMount(){
    Adapter.getComments().then(comments => this.setState({comments:comments}));
    Adapter.getUser().then(profiles => this.setState({profiles:profiles}));
  }

  formHandler = (e, post_id, user_id) => {
    e.preventDefault()
    const commentObj = {
      post_id: post_id,
      message: this.state.newComment,
      user_id: user_id
    }
    Adapter.postComment(commentObj)
    this.setState({newComment: ""})
    
  }

  textHandler = (e) => {
    e.preventDefault()
    this.setState({newComment: e.target.value})
    
  }

  logEmoji = (emoji) => {
    this.setState({newComment: this.state.newComment + emoji.native})
  }

  showEmoji = (e) => {
    e.preventDefault()
    this.setState({emoji: !this.state.emoji})
  }
  
  render(){
    const { posts } = this.props
    const { user } = this.props.user
    const { comments, newComment, profiles } = this.state
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1])),
        postComments = (post === undefined ? [] : comments.filter(comment => comment.post_id === post.id))
    return (
      <div className="forum_post">
          {post === undefined ? null : 
          <div className="forum_post_main">
            <h2>{post.title}</h2>
            <p>{post.message}</p>
            {post.user_id === user.id ? <Link to="/forum/post/edit">Edit</Link> : null}
          </div>}
        <div className="forum__post__comments">
          {postComments.map(comment => <Comments user={user} profiles={profiles} comment={comment}/>)}
        </div>
        <form id="forum__create__comment" onSubmit={e => this.formHandler(e, post.id, user.id)}>
          <textarea onChange={this.textHandler} value={newComment}></textarea>
          <button onClick={this.showEmoji}>Emoji</button>
          {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
          <input className="forum_submit_btn" type="submit"/>
        </form>      
        <button onClick={this.createPoll}>Hello</button>
      </div>
    )
  }
}

export default withRouter(Post)
