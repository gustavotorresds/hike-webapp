import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import AdminHeader from './AdminHeader.js';
import AdminNav from './AdminNav.js';
import AdminMain from './AdminMain.js';
import Loading from '../Loading.js';

import { NavButton } from '../AccountsWrapper.js';

class AdminView extends Component {
	render() {
		if(this.props.loading) {
			return <Loading/>
		}


		if(!this.props.isAdmin) {
			return (<div className="container">
				<div className="row justify-content-center text-center">
					<div className="col-md-6">
						<img className="img-fluid mt-5" src="/forbidden.png"/>
						<h1>Ops, tem certeza de que deveria estar aqui?</h1>
					</div>
				</div>
			</div>);
		}

		return (
			<div className="container-fluid">
				<div className="row">
					{this.props.userId ? 
						<NavButton/> :
						<a className="btn btn-primary" href="/sign-up">Entrar</a>
					}
				</div>
				<div className="row">
					<div className="col-md-3">
						Hike
						<AdminNav/>
					</div>
					<div className="col-md-9">
						{this.props.main}
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	const user = Meteor.subscribe('selfUser');

	return {
		user,
		loading: !user.ready(),
		userId: Meteor.userId(),
		isAdmin: Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group'),
	};
})(AdminView);