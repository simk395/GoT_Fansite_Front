import React, { Component } from 'react'
import Comments from './Comments'
import { Adapter } from '../Adapter'
import {withRouter, Link} from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji';

export class Post extends Component{
  state = {
    comments: [],
    newComment: "",
    profiles: [],
    emoji: false
  }

  componentDidMount(){
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

  textHandler = (value) => {
    this.setState({newComment: value})
  }

  logEmoji = (emoji) => {
    console.log(emoji.native) //string
    console.log(this.state.newComment) //string
    this.setState({newComment: `${this.state.newComment}${emoji.native}`}) //already tried (this.state.newComment + emoji.native)
  }

  showEmoji = (e) => {
    this.setState({emoji: !this.state.emoji})
  }
  
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']],
  }

  render(){
    const { posts } = this.props
    const { user } = this.props.user
    const { setLogin, handleSignUp} = this.props
    const { comments, newComment, profiles } = this.state
    console.log(newComment)
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1])) || "",
        postComments = comments.filter(comment => comment.post_id === post.id),
        checkUser;
     if(user !== undefined){
      checkUser = (post.user_id === user.id ? <Link to="/forum/post/edit">Edit</Link> : null)
    }else{
      checkUser = null;
    }
    return (
      <div className="fp">
        <h3 className="fp_title">{post.title}</h3>
        <div className="fp_post">
          <div className="fp_container">
          <div className="fp_profile">
            <p className="fp_profile_detail">1 of 2</p>
          </div>
          <div className="fp_comment">
            <p className="fp_comment_detail">{post.message}</p>
            {checkUser}
          </div>
          </div>
          <div className="fp_comment_date"> Posted: Month Day Year</div>
        </div>
        <div className="fp_allComments">
        {postComments.map(comment => <Comments user={user} profiles={profiles} comment={comment} handleSignUp={handleSignUp} setLogin={setLogin}/>)}
        </div>
        <form className="fp_create" onSubmit={e => this.formHandler(e, post.id, user.id)}>
          <ReactQuill theme="snow" className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={newComment}></ReactQuill>
          <div className="fp_create_btn">
            <button className="fp_create_btn fp_create_emote" onClick={this.showEmoji}>Emoji</button>
            {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            <input className="fp_create_btn fp_create_submit" type="submit"/>
          </div>
        </form>
        <footer></footer> 
      </div>
    )
  }
}

export default withRouter(Post)
