import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

class CourseHeader extends Component {
	render() {
		return (<div>
			<a href={'/courses/' + this.props.courseId}>Voltar</a>
			<span>HEADER</span>
		</div>);
	}
}

export default withTracker((props) => {
	return {

	};
})(CourseHeader);