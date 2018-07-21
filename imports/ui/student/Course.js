import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import CourseNav from './CourseNav.js';
import CourseMain from './CourseMain.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class Course extends Component {
    render() {
        return (
            <div>
                <CourseNav course={this.props.course} lectureId={this.props.lectureId}/>
                <CourseMain lecture={this.props.lecture}/>
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