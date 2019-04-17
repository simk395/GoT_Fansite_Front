import React, { Component } from 'react'
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { Adapter } from '../Adapter'
import Category from '../component/Category'
import Lannister from '../component/Lannister'
import Baratheon from '../component/Baratheon'
import Stark from '../component/Stark'
import Targaryen from '../component/Targaryen'
import Other from '../component/Other'
import Off_Topic from '../component/Off_Topic'
import General from '../component/General'
import Post from '../component/Post'
import PostCreate from '../component/PostCreate'
import EditPost from '../component/EditPost'
import { Breadcrumb } from 'react-bootstrap'


export class Forum extends Component {
  state = {
    categories:[],
    posts: [],
    profiles: [],
    newProfiles: []
  }
  
  componentWillMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}));
    Adapter.getPosts().then(posts => this.setState({posts: posts}))
    Adapter.getUser().then(profiles => this.setState({profiles:profiles, newProfiles: profiles}))
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
      .then(resp => resp.json())
      .then(profile => this.setState({newProfiles: [...this.state.profiles, profile]}))
      this.props.history.replace(`/forum/${postObj.category_id}`)
  }
  render() {
    const { categories, posts, profiles, newProfiles } = this.state
    const { user, setLogin, handleSignUp } = this.props
    return (
      <div className="forum">
      <Breadcrumb>
      <Breadcrumb.Item>
          <Link to="/forum"> Forum </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active="false">
          Library
        </Breadcrumb.Item>
      </Breadcrumb>
      <hr/>
        <Switch>
          <Route exact path="/forum/edit/:id" render={() => <EditPost posts={posts}/>}/>
          <Route path="/forum/create/:id" render={(props) => <PostCreate {...props} postCreate={this.postCreate} user={user}/>}/>
          <Route path="/forum/:categoryId/:id" render={() => <Post posts={posts} user={user} setLogin={setLogin} handleSignUp={handleSignUp}/>}/>
          {categories.map(category => {
            const path = `/forum/${category.id}`
            switch(category.id){
              case 1: return <Route path={path} render={(props) => <General {...props} id={category.id} posts={posts}/>}/>
              case 2: return <Route path={path} render={(props) => <Stark {...props} id={category.id} posts={posts}/>}/>
              case 3: return <Route path={path} render={(props) => <Baratheon {...props} id={category.id} posts={posts}/>}/>
              case 4: return <Route path={path} render={(props) => <Targaryen {...props} id={category.id} posts={posts}/>}/>
              case 5: return <Route path={path} render={(props) => <Lannister {...props} user={user} profiles={newProfiles} id={category.id} posts={posts}/>}/>;
              case 6: return <Route path={path} render={(props) => <Other {...props} id={category.id} posts={posts}/>}/>
              case 7: return <Route path={path} render={(props) => <Off_Topic {...props} id={category.id} posts={posts}/>}/>
            }
          })}
          <Route path='/forum' render={() => <Category categories={categories} />}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(Forum)
