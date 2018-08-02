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
        const courseInfo = this.props.course ?
            (<div>
                <img src={this.props.course.imageUrl} className="img-fluid"/>
                <h2 className={css(style.courseTitle)}>{this.props.course.title}</h2>
            </div>) :
            '';

        return (
            <div className="row no-gutters">
                <div className={'col-md-2 ' + css(style.courseInfo)}>
                    {courseInfo}
                </div>

                <div className={'col-md-10 ' + css(style.curriculum)}>
                    <h1>{this.props.course ? this.props.course.title : ''} Curriculum</h1>
                    {this.renderCurriculum()}
                </div>
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

const style = StyleSheet.create({
    courseInfo: {
        backgroundColor: '#F0F0F0',
        minHeight: '750px',
    },
    courseTitle: {
        padding: '10px',
    },
    curriculum: {
        padding: '10px 20px',
    }
});