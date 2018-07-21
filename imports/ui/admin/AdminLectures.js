import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class LectureListItem extends Component {
    render() {
        // TODO: Check if here's the best place to fetch info. Prob not.
        const lectureInfo = Lectures.findOne({_id: this.props.lectureId});

        return (
            <li>
                <a href={'/admin/courses/' + this.props.courseId + '/lectures/' + this.props.lectureId}>{lectureInfo.title}</a>
            </li>
        );
    }
}
 
// Task component - represents a single todo item
class AdminLectures extends Component {
    createLecture() {
        let newLectureId = Lectures.insert({
            title: "New Lecture",
            contents: []
        });

        Courses.update(this.props.courseId,
            {
                $push: {
                    lectures: newLectureId
                }
            }
        );
    }

    renderLectures() {
        let lectureList = this.props.course ?
            this.props.course.lectures.map((lectureId) => {
                return <LectureListItem
                    key={lectureId}
                    courseId={this.props.courseId}
                    lectureId={lectureId}
                />
            }) : null;
        return <ul>{lectureList}</ul>;
    }

    render() {
        return (
            <div>
                <h1>{this.props.course ? this.props.course.title : ''}</h1>
                <button onClick={this.createLecture.bind(this)}>New Lecture</button>
                {this.renderLectures()}
            </div>
        );
    }
}

export default withTracker((props) => {
    return {
        course: Courses.findOne({_id: props.courseId})
    };
})(AdminLectures);