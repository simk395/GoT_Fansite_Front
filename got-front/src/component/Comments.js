import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'
import Signin from './Signin'
import upvote from '../images/upvote.png'
import downvote from '../images/downvote.png'
import avatar from '../images/avatar.jpg'
import edit from '../images/edit.png'
import trash from '../images/delete.png'



export class Comments extends Component {
  state = {
    likes: [],
    newLikes: [],
    dislikes:[],
    newDislikes:[],
    signin: false,
    signup: false
  }

  componentDidMount(){
    fetch("http://localhost:3000/user_likes_comments")
    .then(resp => resp.json())
    .then(likes => this.setState({likes:likes, newLikes: likes}))
    fetch("http://localhost:3000/user_dislikes_comments")
    .then(resp => resp.json())
    .then(dislikes => this.setState({dislikes :dislikes, newDislikes: dislikes}))
  }

  handleEdit = () => {
    return this.props.history.push(`/forum/comment/edit/${this.props.comment.id}`)
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
    e.preventDefault()
    if(localStorage.token){
    const voteObj = {
      user_id: this.props.user.id,
      comment_id: this.props.comment.id
    }
    fetch(`http://localhost:3000/user_likes_comments`,{
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
      this.setState({newLikes: [...this.state.newLikes, likes]})
    })
  }else{
    this.setState({ signin: true });
    }
  }

  dislikeHandler = (e) => {
    e.preventDefault()
    if(localStorage.token){
    const voteObj = {
      user_id: this.props.user.id,
      comment_id: this.props.comment.id
    }
    fetch(`http://localhost:3000/user_dislikes_comments`,{
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
      this.setState({newDislikes: [...this.state.newDislikes, dislikes]})
  })
  
  }else{
    this.setState({ signin: true });
    }
  }

  getUserDislikes = (dislikes) => {
    fetch(`http://localhost:3000/user_dislikes_comments`)
      .then(resp => resp.json())
      .then(likes => this.setState({newLikes: [], newDislikes: dislikes}))
  }

  getUserLikes = (likes) => {
    fetch(`http://localhost:3000/user_likes_comments`)
      .then(resp => resp.json())
      .then(dislikes => this.setState({likes:likes, dislikes: dislikes}))
  }
  render() {
      const {id, user_id, message, created_at, updated_at} = this.props.comment
      const { newLikes, newDislikes } = this.state
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
      let likesInt = newLikes.filter(like => like.comment_id === id).length
      let dislikesInt = newDislikes.filter(dislike => dislike.comment_id === id).length
      let voteInt = likesInt - dislikesInt
      let modalClose = () => this.setState({ signin: false, signup:false });
      let audio = new Audio("full_shame.mp3");
    return (
      <div data-id={`${id}`}>
        <div className="fp_post" data-id={id}>
          <div className="fp_container">
            <div className="fp_profile">
              <Link className="username" to={`/profile/${username}`}>{username}</Link>
              <img alt="" className="avatar" src={avatar}></img> 
            </div>
            <div className={`comment-${id} fp_comment`}>
              <div className="fp_comment_detail" dangerouslySetInnerHTML={{__html: message}}></div> 
              {user_id === userId ? 
              <div className="editorial">
                <input alt="" className="comment_edit_btn" onClick={this.handleEdit} type="image" src={edit}/> 
                <input type="image" alt="" src={trash} className={`delete-${id} comment_delete_btn`} onClick={() => Adapter.deleteComment(id)}/>
              </div> : null}
            </div>
            {user_id !== userId ? 
            <div className="vote_container">
              <input alt="" className="upvote" type="image" src={upvote} onClick={(e) => this.likeHandler(e)}></input>
              <p>{voteInt}</p>
              <input alt="" className="downvote" type="image" src={downvote} onClick={(e) => this.dislikeHandler(e)}></input>
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
