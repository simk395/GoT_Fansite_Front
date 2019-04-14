import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'
import Signin from './Signin'



export class Comments extends Component {
  state = {
    comment: this.props.comment.message,
    likes: [],
    signin: false,
    signup: false
  }

  componentDidMount(){
    fetch("http://localhost:3000/user_likes_comments")
    .then(resp => resp.json())
    .then(likes => this.setState({likes :likes}))
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
    if(localStorage.token){
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
  }else{
    this.setState({ signin: true });
  }
  }

  dislikeHandler = (e) => {
    e.preventDefault()
    if(localStorage.token){
    const dislike = this.state.likes.find(like => like.comment_id === this.props.comment.id && like.user_id === this.props.user.id) 
    fetch(`http://localhost:3000/user_likes_comments/${dislike.id}`,{
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
      }
    })
  }else{
    this.setState({ signin: true });
  }
  }

  render() {
      const {id, post_id, user_id, message, created_at} = this.props.comment
      const {comment} = this.state
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
      let modalClose = () => this.setState({ signin: false, signup:false });
      console.log(comment)
    return (
      <div data-id={`${id}`}>
        <div className="fp_post">
          <div className="fp_container">
            <div className="fp_profile"> 
              <Link to={`/profile/${username}`}>{username}</Link>
            </div>
            <div className={`comment-${id} fp_comment`}>
              {/* needs to be able to display inner html */}
              <div className="fp_comment_detail" dangerouslySetInnerHTML={{__html: comment}}></div> 
            </div>
            <div>
              <button onClick={this.likeHandler}>like</button>
              <button onClick={this.dislikeHandler}>dislike</button>
            </div>
          </div>
            <div className="fp_comment_date">{created_at}</div>
        </div>
        {user_id === userId ? <div><button className={`edit-${id}`} onClick={this.handleEdit2}>Edit</button> <button className={`delete-${id}`} onClick={() => Adapter.deleteComment(id)}>Delete</button></div> : null}
        <Signin setLogin={this.props.setLogin} handleSignUp={this.props.handleSignUp} show={this.state.signin} onHide={modalClose}/>
      </div>
    )
  }
}

export default withRouter(Comments)
