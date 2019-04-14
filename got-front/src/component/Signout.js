import React, { Component } from 'react'

export class Signout extends Component {

    componentDidMount(){
        this.props.history.go(-1)
    }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Signout
