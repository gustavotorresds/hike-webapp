import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';

class Course extends Component {
    render() {
        return (
            <li>
                <a href={'/admin/courses/' + this.props.info._id}>
                    {this.props.info.title}
                </a>
            </li>
        );
    }
}
 
// Task component - represents a single todo item
class AdminCourses extends Component {
    renderCourses() {
        const coursesMapped = this.props.courses.map((course) => {
            return <Course key={course._id} info={course}/>;
        });

        return <ul>{coursesMapped}</ul>;
    }

    render() {
        return (
            <div>
                <h1>Aqui estão Admin Courses</h1>
                {this.renderCourses()}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        courses: Courses.find({}).fetch(),
    };
})(AdminCourses);