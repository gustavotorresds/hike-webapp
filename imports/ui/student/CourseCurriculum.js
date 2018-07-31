import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet , css } from 'aphrodite';

import globalStyles from '../globalStyles.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class LectureRaw extends Component {
    render() {
        return (
            <div>
                <li className={css(globalStyles.listItem)}>
                    <a
                    href={'/courses/' + this.props.courseId + '/lectures/' + (this.props.lecture ? this.props.lecture._id : '')}
                    className={css(globalStyles.listLink)}
                    >
                    {this.props.lecture ? this.props.lecture.title : ''}
                    </a>
                </li>
            </div>
        );
    }
}

const Lecture = withTracker((props) => {
    Meteor.subscribe('lectureBasic', props.lectureId);

    return {
        lecture: Lectures.findOne({_id: props.lectureId}),
    };
})(LectureRaw);

class CourseCurriculum extends Component {
    renderCurriculum() {
        const course = this.props.course;
        if(course && course.lectures) {
            const curriculum = course.lectures.map((lectureId) => {
                return <Lecture key={lectureId} courseId={this.props.courseId} lectureId={lectureId}/>
            });
            return <ul className={css(globalStyles.list)}>{curriculum}</ul>;
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.course ? this.props.course.title : ''} Curriculum</h1>
                {this.renderCurriculum()}
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe('course', props.courseId);

    return {
        course: Courses.findOne({_id: props.courseId})
    };
})(CourseCurriculum);