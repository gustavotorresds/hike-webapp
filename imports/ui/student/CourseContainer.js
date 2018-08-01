import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

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
			<div className="container-fluid">
				<div className="row">
			        <div className={'col-md-3 ' + css(style.nav)}>
			        	<div className="row">
							<div className={'col-md-12 ' + css(style.header)}>
								<CourseHeader courseId={this.props.courseId}/>
							</div>
						</div>
			            {nav}
			        </div>
			        <div className="col-md-9">
		        		<ContentNav
		        			courseId={this.props.courseId}
		        			prevLectureId={this.prevLecture()}
		        			nextLectureId={this.nextLecture()}
		        		/>
			        	<CourseContent
				          courseId={this.props.courseId}
				          lectureId={this.props.lectureId}
				          hasAccess={this.hasAccess()}/>
			        </div>
			    </div>
		    </div>
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
		backgroundColor: '#F6F6F6',
        borderRight: '1px solid #E7E7E7',
	},
	header: {
		padding: '0',
	}
});