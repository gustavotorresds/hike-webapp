import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

class ContentNav extends Component {
	completeLecture() {
		Meteor.call('completeLecture', Meteor.userId(), this.props.currLectureId);
	}

	render() {
		return <div className={'row text-center ' + css(style.nav)}>
			{this.props.prevLectureId === -1 ? 
				null :
				<a
					href={'/courses/' + this.props.courseId + '/lectures/' + this.props.prevLectureId}
					className={'col ' + css(style.prevButton, style.navButton)}>
						Aula Anterior
				</a>
			}

			{this.props.nextLectureId === -1 ? 
				null :
				<a
					onClick={this.completeLecture.bind(this)}
					href={'/courses/' + this.props.courseId + '/lectures/' + this.props.nextLectureId}
					className={'col ' + css(style.nextButton, style.navButton)}
				>
					Próxima Aula
				</a>
			}
		</div>;
	}
}

export default withTracker((props) => {
	return {

	};
})(ContentNav);

const style = StyleSheet.create({
	'navButton': {
		color: 'white',
		padding: '12px',
		':hover': {
			textDecoration: 'none',
		},
	},
	prevButton: {
		backgroundColor: '#2c3e50',
	},
	nextButton: {
		backgroundColor: '#16a085',
	}
});