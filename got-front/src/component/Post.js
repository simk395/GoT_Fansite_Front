import React, { Component } from 'react'
import Comments from './Comments'
import { Adapter } from '../Adapter'

export class Post extends Component{
  state = {
    comments: [],
    newComment: ""
  }
  componentDidMount(){
    Adapter.getComments().then(comments => this.setState({comments:comments}))
  }

  formHandler = (e, id) => {
    e.preventDefault()
    Adapter.postComments(id, this.state.newComment)
    this.setState({newComment: ""})
    
  }

  textHandler = (e) => {
    e.preventDefault()
    this.setState({newComment: e.target.value})
  }
  
  render(){
    const { posts } = this.props
    const { comments, newComment } = this.state
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1])),
        postComments = (post === undefined ? [] : comments.filter(comment => comment.post_id === post.id))
    return (
      <div className="forum__post__body">
          {post === undefined ? null : 
          <div className="forum__post__main">
            <h2>{post.title}</h2>
            <p>{post.message}</p>
          </div>}
        <div className="forum__post__comments">
          {postComments.map(comment => <Comments comment={comment}/>)}
        </div>
        <form id="forum__create__comment" onSubmit={e => this.formHandler(e, post.id)}>
            <textarea onChange={this.textHandler} value={newComment}></textarea>  
            <input className="forum_submit_btn" type="submit"/>
        </form>      
      </div>
    )
  }
}

export default Post
