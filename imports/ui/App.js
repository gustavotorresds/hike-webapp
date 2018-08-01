import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AppHeader from './AppHeader.js'

import { StyleSheet, css } from 'aphrodite';
 
class App extends Component {
    render() {
        return (
            <div className={css(styles.appContainer)}>
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

const styles = StyleSheet.create({
    appContainer: {
        listStyle: 'none',
        color: 'black',
    }
});