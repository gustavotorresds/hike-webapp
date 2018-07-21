import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Lectures } from '../../api/lectures.js';
 
class LectureListItem extends Component {
    render() {
        const lec = Lectures.findOne({_id: this.props.lectureId});

        return (
            <li><a href={'/courses/' + this.props.courseId + '/lectures/' + lec._id}>{lec.title}</a></li>
        );
    }
}

class CourseNav extends Component {
    renderLectures() {
        if(this.props.course) {
            const lecturesList = this.props.course.lectures.map((lectureId) => {
                return <LectureListItem key={lectureId} courseId={this.props.course._id} lectureId={lectureId}/>
            });

            return <ul>{lecturesList}</ul>;
        }
    }

    render() {
        return (
            <div>
                <h1>Aqui está o Nav</h1>
                {this.renderLectures()}
            </div>
        );
    }
}

export default withTracker((props) => {
    return {

    };
})(CourseNav);