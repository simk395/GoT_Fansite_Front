import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {

  componentDidMount() {
    this.props.handleLogout();
  }

  render() {
    return(
      <div>
        <h1>LOGOUT</h1>
      </div>
    );
  }
}

export default withRouter(Logout);
