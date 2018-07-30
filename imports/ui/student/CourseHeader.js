import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

class CourseHeader extends Component {
	render() {
		return (<div className={css(style.headerContainer)}>
			<a className={css(style.link)} href={'/courses/' + this.props.courseId}>Voltar</a>
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