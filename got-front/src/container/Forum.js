import React, { Component } from 'react'
import { Switch, Route, withRouter} from 'react-router-dom'
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
import bg from '../images/main.png'

export class Forum extends Component {
  state = {
    categories:[],
    posts: []
  }
  
  componentWillMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}));
    Adapter.getPosts().then(posts => this.setState({posts: posts}))
  }

  render() {
    const { categories, posts } = this.state
    const { user, setLogin, handleSignUp } = this.props
    return (
      <div className="forum">
        <Switch>
          <Route exact path="/forum/post/edit" render={() => <EditPost/>}/>
          <Route path="/forum/:categoryId/:id" render={() => <Post posts={posts} user={user} setLogin={setLogin} handleSignUp={handleSignUp}/>}/>
          <Route path="/create/:id" render={(props) => <PostCreate {...props} user={user}/>}/>
          {categories.map(category => {
            const path = `/forum/${category.id}`
            switch(category.id){
              case 1: return <Route path={path} render={(props) => <General {...props} id={category.id} posts={posts}/>}/>
              case 2: return <Route path={path} render={(props) => <Stark {...props} id={category.id} posts={posts}/>}/>
              case 3: return <Route path={path} render={(props) => <Baratheon {...props} id={category.id} posts={posts}/>}/>
              case 4: return <Route path={path} render={(props) => <Targaryen {...props} id={category.id} posts={posts}/>}/>
              case 5: return <Route path={path} render={(props) => <Lannister {...props} id={category.id} posts={posts}/>}/>;
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
