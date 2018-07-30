import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import CourseHeader from './CourseHeader.js';
import CourseNav from './CourseNav.js';
import CourseContent from './CourseContent.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class CourseContainer extends Component {
	render() {
		const nav = this.props.lectureId ?
			<CourseNav courseId={this.props.courseId} lectureId={this.props.lectureId}/> :
			'';

		return (
			<div className="container-fluid">
				<div className="row">
					<div className={'col-md-12 ' + css(style.header)}>
						<CourseHeader courseId={this.props.courseId}/>
					</div>
				</div>
				<div className="row">
			        <div className={'col-md-3 ' + css(style.nav)}>
			            {nav}
			        </div>
			        <div className="col-md-9">
			        	<CourseContent
				          courseId={this.props.courseId}
				          lectureId={this.props.lectureId}/>
			        </div>
			    </div>
		    </div>
		);
	}
}

export default withTracker((props) => {
	return {

	};
})(CourseContainer);

const style = StyleSheet.create({
	nav: {
		padding: '0',
		backgroundColor: '#F6F6F6',
        borderRight: '1px solid #E7E7E7',
	},
	header: {
		padding: '0',
	}
});