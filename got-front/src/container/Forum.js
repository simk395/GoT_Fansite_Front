import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
import { Adapter } from '../Adapter'
import Category from '../component/Category'
import Lannister from '../component/Lannister'
import Baratheon from '../component/Baratheon'
import Stark from '../component/Stark'
import Targaryen from '../component/Targaryen'
import Other from '../component/Other'
import Off_Topic from '../component/Off_Topic'
import General from '../component/General'

export class Forum extends Component {
  state = {
    categories:[],
  }
  componentDidMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}));
  }

  render() {
    const { categories } = this.state
    return (
      <div>
        <Switch>
          {categories.map(category => {
            const path = `/forum/${category.id}`
            switch(category.id){
              case 1: return <Route path={path} render={() => <General id={category.id}/>}/>
              case 2: return <Route path={path} render={() => <Stark id={category.id}/>}/>
              case 3: return <Route path={path} render={() => <Baratheon id={category.id}/>}/>
              case 4: return <Route path={path} render={() => <Targaryen id={category.id}/>}/>
              case 5: return <Route path={path} render={(props) => <Lannister {...props} id={category.id}/>}/>;
              case 6: return <Route path={path} render={() => <Other id={category.id}/>}/>
              case 7: return <Route path={path} render={() => <Off_Topic id={category.id}/>}/>
            }
          })}
          <Route path='/' render={() => <Category categories={categories} />}/>
        </Switch>
      </div>
    )
  }
}

export default Forum
