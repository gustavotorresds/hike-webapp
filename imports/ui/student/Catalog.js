import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withTracker } from 'meteor/react-meteor-data';

import globalStyles from '../globalStyles.js';

import { Courses } from '../../api/courses.js';
 

class CourseItem extends Component {
    render() {
        return (
            <li className={css(globalStyles.listItem)}>
                <a className={css(globalStyles.listLink)} href={'/courses/' + this.props.course._id}>
                    {this.props.course.title}
                </a>
            </li>
        );
    }
}

class Catalog extends Component {
    renderCourses() {
        const courses = this.props.courses ? this.props.courses.map((course) => {
            return <CourseItem key={course._id} course={course}/>
        }) : null;

        return <ul className={css(globalStyles.list)}>{courses}</ul>
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
    Meteor.subscribe('coursesBasic');

    return {
        courses: Courses.find({}).fetch()
    };
})(Catalog);


const styles = StyleSheet.create({
    courseList: {
        listStyle: 'none'
    }
});