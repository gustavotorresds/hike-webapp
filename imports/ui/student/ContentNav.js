import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Lectures } from '../../api/lectures.js';

class ContentNav extends Component {
	completeLecture() {
		Meteor.call('completeLecture', Meteor.userId(), this.props.currLectureId);
	}

	render() {
		return <div>
			<AppBar position="static" className={css(style.appBar)}>
		        <Toolbar>
		          <a className={css(style.link)} href={'/courses/' + this.props.courseId}><FontAwesomeIcon icon={faArrowLeft}/></a>
		          <Typography variant="title" color="inherit">
		            {this.props.lecture ? this.props.lecture.title : ''}
		          </Typography>
		        </Toolbar>
		    </AppBar>

			{this.props.prevLectureId === -1 ? 
				null :
				<a href={'/courses/' + this.props.courseId + '/lectures/' + this.props.prevLectureId}>
					<Button variant="contained" size="small" className={css(style.navButton, style.prevButton)}>
						Aula Anterior
					</Button>
				</a>
			}

			{this.props.nextLectureId === -1 ? 
				null :
				<a
					onClick={this.completeLecture.bind(this)}
					href={'/courses/' + this.props.courseId + '/lectures/' + this.props.nextLectureId}
				>
					<Button variant="contained" size="small" color="primary" className={css(style.navButton, style.nextButton)}>
			          Próxima Aula
			        </Button>
				</a>
			}
		</div>;
	}
}

export default withTracker((props) => {
	Meteor.subscribe('lecture', props.currLectureId);

	return {
		lecture: Lectures.findOne({_id: props.currLectureId}),
	};
})(ContentNav);

const style = StyleSheet.create({
	'navButton': {
		position: 'fixed',
		bottom: '40px',
		// color: 'white',
		// padding: '12px',
		// ':hover': {
		// 	textDecoration: 'none',
		// },
	},
	prevButton: {
		right: '75%',
	},
	nextButton: {
		right: '40px',
	},
	link: {
		color: '#333',
		marginRight: '10px',
	},
	appBar: {
		backgroundColor: 'white',
		color: 'black',
	}
});