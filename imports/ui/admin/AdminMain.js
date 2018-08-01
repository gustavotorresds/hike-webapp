import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import { Courses } from '../../api/courses.js';

class AdminMainRaw extends Component {
	render() {
		return (
			<div>
				AdminMain
			</div>
		);
	}
}

export default withTracker((props) => {
	return {
		
	}
})(AdminMainRaw);