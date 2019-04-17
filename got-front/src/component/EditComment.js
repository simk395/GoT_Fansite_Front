import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export class EditComment extends Component {
  state = {
    id: "",
    comment: ""
  }

  componentDidMount(){
    const commentId = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])
    const comment = this.props.comments.find(comment => comment.id === commentId) || ""
    this.setState({ id: comment.id, comment:comment.message })
  }

  updateComment = (e,id,comment) => {
    fetch(`http://localhost:3000/comments/${id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
    },
    body: JSON.stringify({comment:{message: comment}})
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
    const { comment, id } = this.state
    return (
          <Form>
            <Form.Group controlId="formBasicTitle">
                <h2>Edit Comment</h2>
            </Form.Group>
            <Form.Group>
                <ReactQuill theme="snow" placeholder="Enter a message..." className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={comment}></ReactQuill>
                    <input alt="" type="image" src={smile} className="fp_create_btn fp_create_emote" onClick={this.showEmoji}/>
                    {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            </Form.Group>
            <Button onClick={(e) => this.updateComment(e,id,comment)}>
                Submit
            </Button>
        </Form>    
    )
  }
}

export default EditComment
