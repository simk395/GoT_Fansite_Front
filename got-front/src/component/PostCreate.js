import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Picker } from 'emoji-mart'

export class PostCreate extends Component {
    state = {
        title: "",
        comment: "",
        emoji: false
    }

    postCreate = (e, title, comment, id) => {
        e.preventDefault()
        const postObj = {
            title: title,
            message:comment,
            category_id: id,
            user_id: this.props.user.user.id
        }
        this.postPost(postObj)
    }

    postPost = (postObj) => {
        fetch('http://localhost:3000/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: localStorage.token
            },
            body: JSON.stringify({post:postObj})
        })
        this.props.history.replace(`/forum/${postObj.category_id}`)
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logEmoji = (emoji) => {
        this.setState({comment: this.state.comment + emoji.native})
      }
      showEmoji = (e) => {
        e.preventDefault()
        this.setState({emoji: !this.state.emoji})
      }
  render() {
    const forumId = parseInt(window.location.href.split("/")[window.location.href.split("/").length-1])
    // console.log(this.props.user)
    return (
      <div>
        <form onSubmit={(e) => this.postCreate(e,this.state.title,this.state.comment, forumId)}>
            <label>Title</label>
            <input name="title" placeholder="enter text" onChange={this.inputHandler} value={this.state.title}></input>
            <textarea name="comment" onChange={this.inputHandler} value={this.state.comment}></textarea>
            <button onClick={this.showEmoji}>Emoji</button>
            {this.state.emoji === false ? null : <Picker onSelect={this.logEmoji} set='emojione'/>}
            <button type="submit">AHHHHHHHHH</button>
        </form>
      </div>
    )
  }
}

export default withRouter(PostCreate)
