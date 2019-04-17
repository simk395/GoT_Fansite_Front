import React, { Component } from 'react'
import Comments from './Comments'
import { Adapter } from '../Adapter'
import {withRouter, Link, Redirect} from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import smile from '../images/smile.png'
import enter from '../images/enter.png'
import avatar from '../images/avatar.jpg'
import edit from '../images/edit.png'

export class Post extends Component{
  state = {
    commentsArr: [],
    newCommentsArr: [],
    message: "",
    emoji: false
  }

  componentDidMount(){
    Adapter.getComments().then(comments => this.setState({commentsArr:comments, newCommentsArr: comments}));
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
    this.postComment(commentObj)
    this.setState({message: ""})
  }

   postComment = (commentObj) => {
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.token
        },
        body:JSON.stringify({comment:commentObj})
    }).then(resp => resp.json())
    .then(comment => {
        this.setState({newCommentsArr: [...this.state.newCommentsArr, comment]})
    })
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']],
  }

  handleEdit = () => {
    let size = window.location.href.split("/"),
        post = this.props.posts.find(post => post.id === parseInt(size[size.length-1])) || ""
    return this.props.history.push(`/forum/edit/${post.id}`)
  }

  render(){
    const { posts, profiles } = this.props
    const { user } = this.props.user
    const { setLogin, handleSignUp} = this.props
    const { commentsArr, newCommentsArr, message} = this.state
    
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1])) || "",
        postComments = newCommentsArr.filter(comment => comment.post_id === post.id),
        postDetails = profiles.find(profile => profile.id === post.user_id),
        checkUser;
    if(user !== undefined){
      checkUser = (post.user_id === user.id ? <input className="edit_btn" onClick={this.handleEdit} type="image" src={edit}/> : null)
    }else{
      checkUser = null;
    }
    console.log(post);
    return (
      <div className="fp">
        <h3 className="fp_title">{post.title}</h3>
        <div className="fp_post">
          <div className="fp_container">
          <div className="fp_profile">
            <Link className="username" to={`/profile/${postDetails.username}`}>{postDetails.username}</Link>
            <img className="avatar" src={avatar}></img> 
          </div>
          <div className="fp_comment">
            <p className="fp_comment_detail" dangerouslySetInnerHTML={{__html: post.message}}></p>
            {checkUser}
          </div>
          </div>
          <p className="fp_comment_date"> {post.created_at} {post.updated_at && (post.updated_at !== post.created_at) ? `Last Editted: ${post.updated_at}`: null}</p>
        </div>
        <div className="fp_allComments">
        {postComments.map(comment => <Comments user={user} profiles={profiles} comment={comment} handleSignUp={handleSignUp} setLogin={setLogin}/>)}
        </div>
        <form className="fp_create" onSubmit={e => this.formHandler(e, post.id, user.id)}>
          <ReactQuill theme="snow" className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={message}></ReactQuill>
          {this.state.emoji === false ? null : <Picker className="emote_box" onSelect={this.logEmoji} set='emojione'/>}
          <div className="fp_create_btn">
            <input type="image" src={smile} className="fp_create_btn fp_create_emote" onClick={this.showEmoji}></input>
            <input className="fp_create_btn fp_create_submit" type="image" src={enter}/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Post)

{/* <Link to={`/forum/edit/${post.id}`}>Edit</Link> */}