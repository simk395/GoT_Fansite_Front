import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import Forum from './container/Forum'
import Lannister from './component/Lannister'
import Baratheon from './component/Baratheon'
import Stark from './component/Stark'
import Targaryen from './component/Targaryen'
import Other from './component/Other'
import Off_Topic from './component/Off_Topic'
import General from './component/General'
import Post from './component/Post'
import { Adapter } from "./Adapter"
import './css/style.css';

class App extends Component {
  state = {
    categories:[]
  }

  componentDidMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}))
  }
  render() {
    const {categories} = this.state
    return (
      <div>
        <Switch>
          {categories.map(category => {
            const path = `/forum/${category.id}`
            switch(category.id){
              case 1: return <Route exact path={path} render={() => <General info={category}/>}/>
              case 2: return <Route exact path={path} render={() => <Stark info={category}/>}/>
              case 3: return <Route exact path={path} render={() => <Baratheon info={category}/>}/>
              case 4: return <Route exact path={path} render={() => <Targaryen info={category}/>}/>
              case 5: return <Route exact path={path} render={(props) => <Lannister {...props} info={category}/>}/>;
              case 6: return <Route exact path={path} render={() => <Other info={category}/>}/>
              case 7: return <Route exact path={path} render={() => <Off_Topic info={category}/>}/>
            }
          })}
          <Route path="/" component={Forum}/>
        </Switch>
      </div>

    );
  }
}

export default App;
