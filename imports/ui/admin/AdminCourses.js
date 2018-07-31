import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';

class Course extends Component {
    render() {
        return (
            <li>
                <a href={'/admin/courses/' + this.props.course._id}>
                    {this.props.course.title}
                </a>
            </li>
        );
    }
}

class AdminCourses extends Component {
    renderCourses() {
        const coursesMapped = this.props.courses.map((course) => {
            return <Course key={course._id} course={course}/>;
        });

        return <ul>{coursesMapped}</ul>;
    }

    render() {
        return (
            <div>
                <h3>Courses</h3>
                {this.renderCourses()}
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('coursesBasic');

    return {
        courses: Courses.find({}).fetch(),
    };
})(AdminCourses);