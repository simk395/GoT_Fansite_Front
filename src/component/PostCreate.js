import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Picker } from 'emoji-mart'
import { Form, Button } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'

export class PostCreate extends Component {
    state = {
        title: "",
        comment: "",
        emoji: false
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
    const forumId = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])
    const { title, comment} = this.state
    const { postCreate } = this.props
    return (
        <Form className="post_create">
            <h1 className="post_create_heading">Create Topic</h1>
            <Form.Group controlId="formBasicTitle">
                <Form.Control className="post_create_title" name="title" type="text" placeholder="Enter a title" onChange={this.handleInput}></Form.Control>
            </Form.Group>
            <Form.Group className="post_create_comment">
                <ReactQuill theme="snow" placeholder="Enter a message..." className="fp_create_textarea" modules={this.modules} onChange={this.textHandler} value={comment}></ReactQuill>
                    <input type="image" src={smile} alt="" className="post_create_emote" onClick={this.showEmoji}></input>
                    {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            </Form.Group>
            <Button className="post_create_submit" variant="dark" onClick={(e) => postCreate(e, title, comment, forumId)}>
                Submit
            </Button>
        </Form>    
        )
    }
}

export default withRouter(PostCreate)