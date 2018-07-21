import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';
 

class CourseItem extends Component {
    render() {
        return (
            <li>
                <a href={'/courses/' + this.props.course._id}>
                    {this.props.course.title}
                </a>
            </li>
        );
    }
}

class CourseList extends Component {
    renderCourses() {
        const courses = this.props.courses ? this.props.courses.map((course) => {
            return <CourseItem key={course._id} course={course}/>
        }) : null;

        return <ul>{courses}</ul>
    }

    render() {
        return (
            <div>
                <h1>Aqui estão nossos cursos</h1>
                {this.renderCourses()}
            </div>
        );
    }
}

export default withTracker((props) => {
  return {
    courses: Courses.find({}).fetch()
  };
})(CourseList);