import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { NavButton } from './AccountsWrapper.js';

import { StyleSheet, css } from 'aphrodite';
 
class AppHeader extends Component {
    render() {
        return (
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark fixed-top " + css(navStyle.mainNav)}>
              <a className={"navbar-brand js-scroll-trigger " + css(navStyle.navbarBrand)} href="#page-top">
                <img className={css(navStyle.navbarBrandImg)} width="100" src="/img/logo-white.png"/>
                <span className={css(navStyle.hikeBrand)}>Hike</span>
              </a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className={"nav-item " + css(navStyle.navItem)}>
                    <a className="nav-link js-scroll-trigger" href="#about">Por Que a Hike</a>
                  </li>
                  <li className={"nav-item " + css(navStyle.navItem)}>
                    <a className="nav-link js-scroll-trigger" href="#testimonials">Depoimentos</a>
                  </li>
                  <li className={"nav-item " + css(navStyle.navItem)}>
                    <a className="nav-link js-scroll-trigger" href="#faq">FAQ</a>
                  </li>
                  <li className={"nav-item " + css(navStyle.navItem)}>
                    <a className="nav-link js-scroll-trigger" href="#courses">Cursos</a>
                  </li>
                  <li className={"nav-item " + css(navStyle.navItem)}>
                    <a className="nav-link js-scroll-trigger" href="#contact">Contato</a>
                  </li>
                  <li className={"nav-item" + css(navStyle.navItem)}>
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

const navStyle = StyleSheet.create({
  mainNav: {
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
  },
  hikeBrand: {
    '@media (min-width: 992px)': {
      display: 'none',
    },
  }
});
