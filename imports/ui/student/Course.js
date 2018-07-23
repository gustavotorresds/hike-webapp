import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import CourseHeader from './CourseHeader.js'; 
import CourseBody from './CourseBody.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class Course extends Component {
    render() {
        return (
            <div className="container-fluid">
                <CourseHeader
                    courseId={this.props.courseId}
                />
                <CourseBody
                    course={this.props.course}
                    lecture={this.props.lecture}
                    courseId={this.props.courseId}
                    lectureId={this.props.lectureId}
                />
            </div>
        );
    }
}

export default withTracker((props) => {
    return {
        course: Courses.findOne({_id: props.courseId}),
        lecture: Lectures.findOne({_id: props.lectureId})
    };
})(Course);
