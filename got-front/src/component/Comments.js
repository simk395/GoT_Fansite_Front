import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'
import { invoke } from 'q';


export class Comments extends Component {
  state = {
    comment: this.props.comment.message,
    likes: []
  }

  componentDidMount(){
    fetch("http://localhost:3000//user_likes_comments")
    .then(resp => resp.json())
    .then(console.log)
  }

  handleEdit2 = () => {
    document.querySelector(`.edit-${this.props.comment.id}`).remove()
    document.querySelector(`.delete-${this.props.comment.id}`).remove()
    const div = document.querySelector(`.comment-${this.props.comment.id}`)
    div.contentEditable = "true"
    const button = document.createElement("button")
    div.after(button)
    button.addEventListener("click", this.handleSubmit)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const div = document.querySelector(`.comment-${this.props.comment.id}`)
    fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
      },
      body:JSON.stringify({comment: {message: div.innerText}})
    })
  }

  commentHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  likeHandler = (e) => {
    const likeObj ={
      user_id: this.props.user.id,
      comment_id: this.props.comment.id
    }
    e.preventDefault()
    fetch("http://localhost:3000/user_likes_comments",{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
      },
      body:JSON.stringify({like: likeObj})
    })
  }

  dislikeHandler = (e) => {
    e.preventDefault()
    
  }

  render() {
      const {id, post_id, user_id, message, created_at} = this.props.comment
      const {comment} = this.state
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
    return (
      <div data-id={`${id}`}>
         <div className={`comment-${id}`}>
          {comment}
         </div>
         <div><button onClick={this.likeHandler}>like</button><button>dislike</button></div>
        <br/>
        <Link to={`/profile/${username}`}>{username}</Link>
        {user_id === userId ? <div><button className={`edit-${id}`} onClick={this.handleEdit2}>Edit</button> <button className={`delete-${id}`} onClick={() => Adapter.deleteComment(id)}>Delete</button></div> : null}
      </div>
    )
  }
}

export default withRouter(Comments)
