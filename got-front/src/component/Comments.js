import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'
import Signin from './Signin'
import upvote from '../images/upvote.png'
import downvote from '../images/downvote.png'
import avatar from '../images/avatar.jpg'


export class Comments extends Component {
  state = {
    comment: this.props.comment.message,
    likes: [],
    dislikes:[],
    signin: false,
    signup: false
  }

  componentDidMount(){
    fetch("http://localhost:3000/user_likes_comments")
    .then(resp => resp.json())
    .then(likes => this.setState({likes :likes}))
    fetch("http://localhost:3000/user_dislikes_comments")
    .then(resp => resp.json())
    .then(dislikes => this.setState({dislikes :dislikes}))
  }

  

  handleEdit2 = () => {
    document.querySelector(`.edit-${this.props.comment.id}`).remove()
    document.querySelector(`.delete-${this.props.comment.id}`).remove()
    const div = document.querySelector(`.comment-${this.props.comment.id}`)
    div.contentEditable = "true"
    const button = document.createElement("button")
    button.className="edit-submitBtn"
    button.innerText="Submit"
    div.append(button)
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

  likeHandler = (e, vote) => {
    e.preventDefault()
    if(localStorage.token){
    const voteObj = {
      user_id: this.props.user.id,
      comment_id: this.props.comment.id
    }
    fetch(`http://localhost:3000/user_${vote}_comments`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
      },
      body:JSON.stringify({vote: voteObj})
    })
    .then(resp => resp.json())
    .then(likes => {
      this.getUserDislikes(likes)
    })
  }else{
    this.setState({ signin: true });
  }
  }

  dislikeHandler = (e, vote) => {
    e.preventDefault()
    if(localStorage.token){
    const voteObj = {
      user_id: this.props.user.id,
      comment_id: this.props.comment.id
    }
    fetch(`http://localhost:3000/user_${vote}_comments`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
      },
      body:JSON.stringify({vote: voteObj})
    })
    .then(resp => resp.json())
    .then(dislikes => {
      this.getUserLikes(dislikes)
  })
  }else{
    this.setState({ signin: true });
  }
  }

  getUserDislikes = (dislikes) => {
    fetch(`http://localhost:3000/user_dislikes_comments`)
      .then(resp => resp.json())
      .then(likes => this.setState({likes:likes, dislikes: dislikes}))
  }

  getUserLikes = (likes) => {
    fetch(`http://localhost:3000/user_likes_comments`)
      .then(resp => resp.json())
      .then(dislikes => this.setState({likes:likes, dislikes: dislikes}))
  }
  render() {
      const {id, post_id, user_id, message, created_at, updated_at} = this.props.comment
      const {comment, likes, dislikes} = this.state
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
      let likesInt = likes.filter(like => like.comment_id === id).length
      let dislikesInt = dislikes.filter(dislike => dislike.comment_id === id).length
      let voteInt = likesInt - dislikesInt
      let modalClose = () => this.setState({ signin: false, signup:false });
    return (
      <div data-id={`${id}`}>
        <div className="fp_post">
          <div className="fp_container">
            <div className="fp_profile">
              <Link className="username" to={`/profile/${username}`}>{username}</Link>
              <img className="avatar" src={avatar}></img> 
            </div>
            <div className={`comment-${id} fp_comment`}>
              <div className="fp_comment_detail" dangerouslySetInnerHTML={{__html: comment}}></div> 
              {user_id === userId ? <div><button className={`edit-${id}`} onClick={this.handleEdit2}>Edit</button> <button className={`delete-${id}`} onClick={() => Adapter.deleteComment(id)}>Delete</button></div> : null}
            </div>
            {user_id !== userId ? 
            <div className="vote_container">
              <input className="upvote" type="image" src={upvote} onClick={(e) => this.likeHandler(e,"likes")}></input>
              <p>{voteInt}</p>
              <input className="downvote" type="image" src={downvote} onClick={(e) => this.dislikeHandler(e, "dislikes")}></input>
            </div>
            : null
            }
          </div>
            <div className="fp_comment_date">{created_at} {updated_at && (updated_at !== created_at) ? `Last Editted: ${updated_at}`: null}</div>
        </div>
        <Signin setLogin={this.props.setLogin} handleSignUp={this.props.handleSignUp} show={this.state.signin} onHide={modalClose}/>
      </div>
    )
  }
}

export default withRouter(Comments)
