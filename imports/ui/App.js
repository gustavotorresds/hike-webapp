import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
class App extends Component {
    render() {
        return (
            <div>
                {this.props.main}
            </div>
        );
    }
}

export default withTracker(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    
  };
})(App);