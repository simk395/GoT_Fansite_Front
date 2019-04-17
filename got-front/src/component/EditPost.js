import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export class EditPost extends Component {
  state={
    id: "",
    title: "",
    comment: "",
    emoji: false
  }

  componentDidMount(){
    const forumId = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])
    const post = this.props.posts.find(post => post.id === forumId) || ""
    this.setState({id: post.id, title: post.title, comment:post.message})
  }

  updatePost = (e,id,title, comment) => {
    const postObj = {
      title: title,
      message: comment
    }

    fetch(`http://localhost:3000/posts/${id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
    },
    body:JSON.stringify({post: postObj})
  })
}

  textHandler = (value) => {
    this.setState({comment: value})
  }

  handleInput = event => {
      this.setState({[event.target.name]: event.target.value});
    }
  logEmoji = (emoji) => {
      this.setState({comment: this.state.comment + emoji.native})
    }
    showEmoji = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({emoji: !this.state.emoji});
  }

  render() {
    const { title, comment, id} = this.state
    return (
          <Form className="post_create">
            <h2 className="post_create_heading">{title}</h2>
            <Form.Group className="post_create_comment">
                <ReactQuill theme="snow" placeholder="Enter a message..." className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={comment || ''}></ReactQuill>
                    <input type="image" alt="" src={smile} className="post_create_emote" onClick={this.showEmoji}/>
                    {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            </Form.Group>
            <Button className="post_create_submit" variant="dark" onClick={(e) => this.updatePost(e,id,title,comment)}>
                Submit
            </Button>
        </Form>    
    )
  }
}

export default EditPost
