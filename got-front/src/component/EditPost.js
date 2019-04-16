import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'
import enter from '../images/enter.png'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export class EditPost extends Component {
  state={
    title: "",
    comment: ""
  }

  componentDidMount(){
    const forumId = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])
    const post = this.props.posts.find(post => post.id === forumId) || ""
    this.setState({title:post.title, comment:post.message})
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
    const { title, comment} = this.state
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
            <Button>
                Submit
            </Button>
        </Form>    
      </Form>
    )
  }
}

export default EditPost
