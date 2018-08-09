import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet , css } from 'aphrodite';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import globalStyles from '../globalStyles.js';
import CourseNav from './CourseNav.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

import Button from '@material-ui/core/Button';

class LectureRaw extends Component {
    render() {
        return (
            <div>
                <li className={css(globalStyles.listItem)}>
                    <a
                    href={'/courses/' + this.props.courseId + '/lectures/' + (this.props.lecture ? this.props.lecture._id : '')}
                    className={css(globalStyles.listLink)}
                    >
                        <div className="row justify-content-between">
                            <div className="col">
                                {this.props.lecture ? this.props.lecture.title : ''}
                            </div>
                            <div className={"col-2 " + css(style.rightAlign)}>
                                <button className="btn btn-info btn-sm">Começar</button>
                            </div>
                        </div>
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
            (<Paper className={css(style.courseInfo)} elevation={1}>
                <Typography className={css(style.courseTitle)} variant="headline" component="h1">
                  {this.props.course.title}
                </Typography>
                <Typography className={css(style.courseDescription)} component="p">
                  {this.props.course.description}
                </Typography>
            </Paper>) :
            '';

        return (<div className={css(style.container)}>
            <div className="row no-gutters">
                <div className={'col'}>
                    {courseInfo}
                </div>
            </div>

            <div className="row justify-content-center no-gutters">
                <div className={'col-md-6 mt-4 ' + css(style.curriculum)}>
                    <div className="row justify-content-center">
                        <div className={'col-md-4'}>
                            <CourseNav courseId={this.props.courseId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default withTracker((props) => {
    Meteor.subscribe('course', props.courseId);

    return {
        course: Courses.findOne({_id: props.courseId})
    };
})(CourseCurriculum);

const style = StyleSheet.create({
    container: {
       backgroundColor: '#F3F3F3', 
    },
    courseInfo: {
        padding: '40px 20%',
    },
    courseTitle: {
        marginBottom: '15px',
        fontSize: '30pt',
    },
    courseDescription: {
        lineHeight: '200%',
        fontSize: '12pt',
    },
    curriculum: {
        backgroundColor: 'white',
    },
    rightAlign: {
        textAlign: 'right',
    }
});