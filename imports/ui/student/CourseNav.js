import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Lectures } from '../../api/lectures.js';
import { Courses } from '../../api/courses.js';
 
class LectureListItemRaw extends Component {
    render() {
        const lecItem = this.props.lecture ?
                <a className={
                        css(style.lectureLink, this.props.isChosen && style.highlight)
                    }
                    href={'/courses/' + this.props.courseId + '/lectures/' + this.props.lecture._id}>
                        {this.props.lecture.title}
                </a> : '';

        return (
            <li>{lecItem}</li>
        );
    }
}

const LectureListItem = withTracker((props) => {
    Meteor.subscribe('lecture', props.lectureId);

    return {
        lecture: Lectures.findOne({_id: props.lectureId}),
    }
})(LectureListItemRaw);

class CourseNav extends Component {
    renderLectures() {
        if(this.props.course) {
            const lecturesList = this.props.course.lectures.map((lectureId) => {
                return <LectureListItem
                    key={lectureId}
                    courseId={this.props.course._id}
                    lectureId={lectureId}
                    isChosen={(this.props.lectureId === lectureId)}
                />
            });

            return <ul className={css(style.lectureList)}>{lecturesList}</ul>;
        }
    }

    render() {
        return (
            <div className={css(style.nav)}>
                <h2 className={css(style.navTitle)}>{this.props.course ? this.props.course.title : ''}</h2>
                {this.renderLectures()}
            </div>
        );
    }
}

export default withTracker((props) => {
    return {
        course: Courses.findOne({_id: props.courseId}),
    };
})(CourseNav);

const style = StyleSheet.create({
    navTitle: {
        padding: '10px',
    },
    lectureList: {
        listStyle: 'none',
        padding: '0'
    },
    lectureLink: {
        display: 'block',
        color: '#5B5B5B',
        padding: '10px 0 10px 10px',
        margin: '0',
        borderBottom: '1px solid #E7E7E7',
        ':hover': {
            textDecoration: 'none',
            color: '#8C8C8C',
            backgroundColor: 'rgba(67, 170, 255, 0.2)',
            cursor: 'pointer',
        },
    },
    highlight:{
        fontWeight: 'bold',
        backgroundColor: 'rgba(112, 190, 255, 0.5)',
        ':hover': {
            color: 'black',
        },
    },
});