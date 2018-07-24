import React, { Component } from 'react';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import AdminHeader from './AdminHeader.js';
import AdminNav from './AdminNav.js';
import AdminMain from './AdminMain.js';

export default class AdminView extends Component {
	render() {
		return (
			<div className="container-fluid">
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