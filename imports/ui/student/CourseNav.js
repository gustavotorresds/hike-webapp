import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Lectures } from '../../api/lectures.js';
 
class LectureListItem extends Component {
    render() {
        const lec = Lectures.findOne({_id: this.props.lectureId});

        return (
            <li>
                <a className={
                        css(style.lectureLink, this.props.isChosen && style.highlight)
                    }
                    href={'/courses/' + this.props.courseId + '/lectures/' + lec._id}>
                        {lec.title}
                </a>
            </li>
        );
    }
}

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