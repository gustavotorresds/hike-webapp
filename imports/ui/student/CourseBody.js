import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import CourseNav from './CourseNav.js';
import CourseContent from './CourseContent.js';

class CourseBody extends Component {
	render() {
		return (
			<div className="row">
		        <div className={'col-md-3 ' + css(style.nav)}>
		            <CourseNav course={this.props.course} lectureId={this.props.lectureId}/>
		        </div>
		        <div className="col-md-9">
		            <CourseContent lecture={this.props.lecture}/>
		        </div>
		    </div>
		);
	}
}

export default withTracker((props) => {
	return {

	};
})(CourseBody);

const style = StyleSheet.create({
	nav: {
		padding: '0',
		backgroundColor: '#F6F6F6',
        borderRight: '1px solid #E7E7E7',
	}
});