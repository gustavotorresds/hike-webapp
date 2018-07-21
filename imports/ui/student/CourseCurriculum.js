import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class Lecture extends Component {
    render() {
        const lec = Lectures.findOne({_id: this.props.lectureId});

        return (
            <div>
                <li><a href={'/courses/' + this.props.courseId + '/lectures/' + lec._id}>{lec.title}</a></li>
            </div>
        );
    }
}

class CourseCurriculum extends Component {
    renderCurriculum() {
        const course = this.props.course;
        if(course) {
            const curriculum = course.lectures.map((lectureId) => {
                return <Lecture key={lectureId} courseId={this.props.courseId} lectureId={lectureId}/>
            });
            return curriculum;
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
  return {
    course: Courses.findOne({_id: props.courseId})
  };
})(CourseCurriculum);