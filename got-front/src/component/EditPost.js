import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'
import enter from '../images/enter.png'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export class EditPost extends Component {
  state={
    id: "",
    title: "",
    comment: ""
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
      e.preventDefault()
      this.setState({emoji: !this.state.emoji})
  }

  render() {
    const { title, comment, id} = this.state
    return (
      <Form>
          <Form>
            <Form.Group controlId="formBasicTitle">
                <h2>{title}</h2>
            </Form.Group>
            <Form.Group>
                <ReactQuill theme="snow" placeholder="Enter a message..." className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={comment}></ReactQuill>
                    <input type="image" src={smile} className="fp_create_btn fp_create_emote" onClick={this.showEmoji}></input>
                    {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            </Form.Group>
            <Button onClick={(e) => this.updatePost(e,id,title,comment)}>
                Submit
            </Button>
        </Form>    
      </Form>
    )
  }
}

export default EditPost
