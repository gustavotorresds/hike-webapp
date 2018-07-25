import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import AdminHeader from './AdminHeader.js';
import AdminNav from './AdminNav.js';
import AdminMain from './AdminMain.js';

import { NavButton } from '../AccountsWrapper.js';

class AdminView extends Component {
	render() {
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
	return {
		userId: Meteor.userId()
	};
})(AdminView);