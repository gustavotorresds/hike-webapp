import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import Grid from '@material-ui/core/Grid';

import CourseHeader from './CourseHeader.js';
import CourseNav from './CourseNav.js';
import ContentNav from './ContentNav.js';
import CourseContent from './CourseContent.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class CourseContainer extends Component {
	nextLecture() {
		if(this.props.course) {
			const lectures = this.props.course.lectures;
			const lectureIndex = lectures.indexOf(this.props.lectureId);
			const nextLectureIndex = lectureIndex + 1;
			if(nextLectureIndex < lectures.length) {
				return lectures[nextLectureIndex];
			}
		}

		return -1;
	}

	prevLecture() {
		if(this.props.course) {
			const lectures = this.props.course.lectures;
			const lectureIndex = lectures.indexOf(this.props.lectureId);
			const nextLectureIndex = lectureIndex - 1;
			if(nextLectureIndex >= 0) {
				return lectures[nextLectureIndex];
			}
		}

		return -1;
	}

	hasAccess() {
		var userId = Meteor.userId();
		if(Roles.userIsInRole(userId, ['admin'], 'default-group')) {
			return true;
		}

		const students = this.props.course && this.props.course.students ?
			this.props.course.students :
			[];

		return students.indexOf(userId) !== -1;
	}

	render() {
		const nav = this.props.lectureId ?
			<CourseNav courseId={this.props.courseId} lectureId={this.props.lectureId}/> :
			'';

		return (
			<Grid container spacing={0}>
		        <Grid item xs={2} className={css(style.nav)}>
		        	<h2 className={css(style.navTitle)}>{this.props.course ? this.props.course.title : ''}</h2>
		          {nav}
		        </Grid>
		        <Grid item xs={10} className={css(style.contentContainer)}>
		          <ContentNav
	        			courseId={this.props.courseId}
	        			currLectureId={this.props.lectureId}
	        			prevLectureId={this.prevLecture()}
	        			nextLectureId={this.nextLecture()}
	        	   />
	        	   	<CourseContent
			          courseId={this.props.courseId}
			          lectureId={this.props.lectureId}
			          hasAccess={this.hasAccess()}/>
		        </Grid>
		    </Grid>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('AdminCourse', props.courseId);

	return {
		course: Courses.findOne({_id: props.courseId})
	};
})(CourseContainer);

const style = StyleSheet.create({
	nav: {
		backgroundColor: 'white',
        borderRight: '1px solid #E7E7E7',
        minHeight: '100vh',
	},
	navTitle: {
        padding: '10% 0 0 10%',
        fontSize: '18pt',
        fontWeight: 'normal',
    },
	header: {
		padding: '0',
	},
	rowContainer: {
		minHeight: '100vh',
	},
	contentContainer: {
		backgroundColor: '#F3F3F3',
	},
});