import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

class StudentHeader extends Component {
	render() {
		return (<div>
			<span>HEADER</span>
		</div>);
	}
}

export default withTracker((props) => {
	return {

	};
})(StudentHeader);