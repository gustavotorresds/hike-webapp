import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';

import { withTracker } from 'meteor/react-meteor-data';

class Header extends Component {
	render() {
		return (<header className={css(headerStyle.masthead)} id="header">
	      <div className="container-fluid">
	        <div className="row align-items-center">
	          <div className="col-md-4 offset-md-1 col-12">
	            <h1 className={'mb-4 ' + css(headerStyle.headingOne)}>APRENDA A PROGRAMAR EM 30 DIAS</h1>
	            <p className={'mb-4 ' + css(headerStyle.paragraph)}>Se você sempre quis aprender a programar mas não sabe por onde começar, está no lugar certo.</p>

	            <div className="row justify-content-start mb-5">
	              <div className="col-12">
	                <button className={'btn btn-primary btn-block mt-3 form-toggle ' + css(style.btn, style.btnPrimary)} data-target="signup">Inscreva-se</button>
	              </div>
	              <div className="col-12">
	                <a className={'btn btn-block mt-3 js-scroll-trigger ' + css(style.btn, style.btnOutline)} href="#about">Saiba mais</a>
	              </div>
	            </div>
	          </div>
	        
	          <div className="col-md-7 col-12">
	            <img className="img-fluid" src="/img/hero12.jpg"/>
	          </div>
	        </div>
	      </div>
	    </header>);
	}
}

const headerStyle = StyleSheet.create({
	masthead: {
		paddingTop: '8rem',
  		paddingBottom: 'calc(6rem - 56px)',
  		'@media (min-width: 768px)': {
            paddingTop: '9rem',
  			minHeight: '600px',
        },
        '@media (min-width: 992px)': {
            paddingTop: '9rem',
  			minHeight: '730px',
        },
	},
	headingOne: {
		fontSize: '1.8rem',
  		fontWeight: 'bold',
  		'@media (min-width: 768px)': {
            fontSize: '3.5rem',
        },
	},
	paragraph: {
		color: '#666666',
  		fontSize: '1.2rem',
  		'@media (min-width: 768px)': {
            fontSize: '1.5rem',
        },
	},
});

class Index extends Component {
    render() {
        return (
            <div className={css(style.indexContainer)}>
             	<h1>Index</h1>
            </div>
        );
    }
}

export default withTracker((props) => {
	return {

	};
})(Index);

const style = StyleSheet.create({
	indexContainer: {
		fontFamily: 'Varela Round, sans-serif',
	},

	btn: {
		fontWeight: '700',
		textTransform: 'uppercase',
		border: 'none',
		fontSize: '15pt',
	},
	
	btnPrimary: {
	  backgroundColor: '#3498db',
	  borderColor: '#373737',
	  ':hover': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	  ':focus': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	  ':active': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	},

	btnSecondary: {
	  backgroundColor: '#373737',
	  color: 'white',
	},

	btnOutline: {
		backgroundColor: 'white',
		color: '#373737',
		border: 'solid 1px #373737',
		':hover': {
		 	color: '#373737',
		 	border: 'solid 1px #373737',
		},
	},
});