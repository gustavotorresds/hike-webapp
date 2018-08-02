import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';


class CourseHeader extends Component {
	render() {
		return (<div className={css(style.headerContainer)}>
			<a className={css(style.link)} href={'/courses/' + this.props.courseId}><FontAwesomeIcon icon={faChevronCircleLeft} size="2x"/></a>
		</div>);
	}
}

export default withTracker((props) => {
	return {

	};
})(CourseHeader);

const style = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#0055A0',
		color: 'white',
		padding: '12px',
	},
	link: {
		color: 'white',
	}
});