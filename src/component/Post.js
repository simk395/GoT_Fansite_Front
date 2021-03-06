import React, { Component } from 'react'
import Comments from './Comments'
import { withRouter, Link } from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import smile from '../images/smile.png'
import enter from '../images/enter.png'
import avatar from '../images/avatar.jpg'
import edit from '../images/edit.png'
import Moment from 'react-moment';
import 'moment-timezone';


export class Post extends Component{
  state = {
    message: "",
    emoji: false
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']],
  }

  textHandler = (value) => {
    this.setState({message: value})
  }

  logEmoji = (emoji) => {
    this.setState({message: this.state.message + emoji.native})
  }

  showEmoji = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({emoji: !this.state.emoji});
  }

  formHandler = (e, post_id, user_id) => {
    e.preventDefault()
    const commentObj = {
      post_id: post_id,
      message: this.state.message,
      user_id: user_id
    }
    this.props.postComment(commentObj)
    this.setState({message: ""})
  }

  handleEdit = () => {
    let size = window.location.href.split("/"),
        post = this.props.posts.find(post => post.id === parseInt(size[size.length-1])) || ""
    return this.props.history.push(`/forum/post/edit/${post.id}`)
  }

  render(){
    const { posts, profiles, setLogin, handleSignUp, comments } = this.props
    const { user } = this.props.user
    const { message } = this.state
    
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1])) || "",
        postComments = comments.filter(comment => comment.post_id === post.id),
        postDetails = profiles.find(profile => profile.id === post.user_id) || {},
        checkUser;

    if(user !== undefined){
      checkUser = (post.user_id === user.id ? <input alt="" className="edit_btn" onClick={this.handleEdit} type="image" src={edit}/> : null)
    }else{
      checkUser = null;
    }

    return (
      <div className="fp">
        <h3 className="fp_title">{post.title}</h3>
        <div className="fp_post">
          <div className="fp_container">
            <div className="fp_profile">
              <Link className="username" to={`/profile/${postDetails.username}`}>{postDetails.username}</Link>
              <img alt="" className="avatar" src={avatar}></img> 
            </div>
            <div className="fp_comment">
               <p className="fp_comment_detail" dangerouslySetInnerHTML={{__html: post.message}}></p>
              {checkUser}
            </div>
          </div>
          <p className="fp_comment_date"> <Moment format="LLL">{post.created_at}</Moment> {post.updated_at && (post.updated_at !== post.created_at) ? <span> Editted: <Moment format="LLL">{post.updated_at}</Moment></span>: null}</p>
        </div>
        <div className="fp_allComments">
          {postComments.map(comment => <Comments user={user} profiles={profiles} comment={comment} handleSignUp={handleSignUp} setLogin={setLogin}/>)}
        </div>
        {localStorage.token ? 
        <form className="fp_create" onSubmit={e => this.formHandler(e, post.id, user.id)}>
          <ReactQuill theme="snow" className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={message}></ReactQuill>
          {this.state.emoji === false ? null : <Picker className="emote_box" onSelect={this.logEmoji} set='emojione'/>}
          <div className="fp_create_btn">
            <input alt="" type="image" src={smile} className="fp_create_btn fp_create_emote" onClick={this.showEmoji}></input>
            <input alt="" className="fp_create_btn fp_create_submit" type="image" src={enter}/>
          </div>
        </form>
        : null  
      }
      </div>
    )
  }
}

export default withRouter(Post)
