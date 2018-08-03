import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../api/courses.js';

import { NavButton } from './AccountsWrapper.js';

import { StyleSheet, css } from 'aphrodite';
 
class AppHeader extends Component {
    render() {
        return (
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark " + css(navStyle.mainNav)}>
              <a className={"navbar-brand js-scroll-trigger " + css(navStyle.navbarBrand)} href="/">
                <img className={css(navStyle.navbarBrandImg)} width="100" src="/img/logo-white.png"/>
                <span className={css(navStyle.hikeBrand)}>Hike</span>
              </a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className={"nav-item"}>
                    {this.props.userId ? 
                      <a
                        className={"nav-link " + css(navStyle.navItem)}
                        href="#"
                        onClick={AccountsTemplates.logout.bind(this)}>
                        Sair
                      </a> :
                      <a className={"nav-link " + css(navStyle.navItem)} href="/sign-up">Entrar</a>
                    }
                  </li>
                  <li className={"nav-item"}>
                    <a className={"nav-link " + css(navStyle.navItem)} href={"/courses/" + (this.props.course ? this.props.course._id : '')}>Comece Já</a>
                  </li>
                </ul>
              </div>
          </nav>
        );
    }
}

export default withTracker(props => {
  // TODO: change this whenever we create new courses.
  Meteor.subscribe('coursesBasic');

  return {
    userId: Meteor.userId(),
    course: Courses.findOne({}),
  };
})(AppHeader);

const navStyle = StyleSheet.create({
  mainNav: {
    backgroundColor: '#212529',
    borderBottom: '1px solid rgba(33, 37, 41, 0.1)',
    webkitTransition: 'all 0.2s',
    mozTransition: 'all 0.2s',
    transition: 'all 0.2s',
    '@media (min-width: 992px)': {
      borderColor: 'transparent',
      paddingLeft: '65px',
      paddingRight: '65px',
    },
  },
  navbarBrand: {
    textTransform: 'uppercase',
    ':hover': {
      color: '#3498db',
    },
    '@media (min-width: 992px)': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  navbarBrandImg: {
    display: 'none',
    width: '200',
    height: '200',
    '@media (min-width: 992px)': {
      display: 'inline-block',
      maxHeight: '40px',
      width: 'auto',
    },
  },
  navItem: {
    fontSize: '.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    '@media (min-width: 992px)': {
      padding: '0.5rem 1rem',
    },
  },
  hikeBrand: {
    '@media (min-width: 992px)': {
      display: 'none',
    },
  }
});
