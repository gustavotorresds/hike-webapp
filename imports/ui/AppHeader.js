import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { NavButton } from './AccountsWrapper.js';

import { StyleSheet, css } from 'aphrodite';
 
class AppHeader extends Component {
    render() {
        return (
            <nav className={'navbar navbar-expand-lg ' + css(style.navContainer)}>
              <a href="/" className={css(style.navLink)}>Hike</a>
              <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={'navbar-toggler-icon'}></span>
              </button>

              <div className={'collapse navbar-collapse'} id="navbarSupportedContent">
                <ul className={'navbar-nav ml-auto'}>
                  <li className={'nav-item'}>
                    <a className={css(style.navLink)} href="#">Meus Cursos</a>
                  </li>
                  <li className={'nav-item'}>
                    <a className={css(style.navLink)} href="/courses">Todos os Cursos</a>
                  </li>
                  <li className={'nav-item'}>
                    {this.props.userId ? 
                      <NavButton/> :
                      <a className="btn btn-primary" href="/sign-up">Entrar</a>
                    }
                  </li>
                </ul>
              </div>
            </nav>
        );
    }
}

export default withTracker(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    userId: Meteor.userId()
  };
})(AppHeader);

const style = StyleSheet.create({
  navContainer: {
    backgroundColor: '#0055A0',
    color: 'white',
    padding: '12px',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.5)',
    padding: '0 10px',
    transition: '.1s',
    ':hover': {
      color: 'white',
      textDecoration: 'none',
    }
  }
});