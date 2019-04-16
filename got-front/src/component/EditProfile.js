import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import smile from '../images/smile.png'
import enter from '../images/enter.png'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export class EditProfile extends Component {
    state = {
        id: this.props.user.id,
        bio: this.props.user.bio,
        emoji: false
    }

    handleEdit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/users/${this.state.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: localStorage.token
            },
            body:JSON.stringify({user: {bio: this.state.bio}})
        })
    }

    textHandler = (value) => {
        this.setState({bio: value})
      }

      modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']],
      }

      showEmoji = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({emoji: !this.state.emoji});
      }

  render() {
      const { bio } = this.state
      console.log(bio)
    return (
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="profile_edit" centered>
            <Modal.Header className="profile_edit_header" closeButton>
                <div className="profile_edit_form">
                    <h2>Edit Bio</h2>
                    <ReactQuill theme="snow" placeholder="Tell us about yourself..." className="profile_edit_textarea" modules={this.modules} onChange={this.textHandler} value={bio}></ReactQuill>
                </div>
                {this.state.emoji === false ? null : <Picker className="profile_emote_box" onSelect={this.logEmoji} set='emojione'/>}
                <div className="profile_edit_submit">
                    <input type="image" src={smile} className="fp_create_btn fp_create_emote" onClick={this.showEmoji}></input>
                    <input className="fp_create_btn fp_create_submit" onClick={this.handleEdit} type="image" src={enter}/>
                </div>
            </Modal.Header>
        </Modal>
    )
  }
}

export default withRouter(EditProfile)
