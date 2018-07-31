import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';

class LectureListItemRaw extends Component {
    render() {
        const lectureInfo = this.props.lectureInfo;

        return (
            <a className={css(globalStyles.listLink)} href={'/admin/courses/' + this.props.courseId + '/lectures/' + this.props.lectureId}>{lectureInfo ? lectureInfo.title : ''}</a>
        );
    }
}

const LectureListItem = withTracker((props) => {
    Meteor.subscribe('lectureBasic', props.lectureId);

    return {
        lectureInfo: Lectures.findOne({_id: props.lectureId})
    };
})(LectureListItemRaw);
 
class AdminLectures extends Component {
    constructor(props) {
        super(props);

        /* TODO: check if the current way is how state should be initialized.
         * I thought the commented code was best, but it broke.
         */
        this.state = {
            lectures: props.course ? props.course.lectures : [],
        }
        
        this.onSortEnd = ({oldIndex, newIndex}) => {
            this.setState({
                lectures: arrayMove(this.state.lectures, oldIndex, newIndex),
            });

            Meteor.call(
                'updateCourseLectures',
                this.props.courseId,
                this.state.lectures
            );
        };
    }

    /* 
     * Using componentDidUpdate was necessary to load data on page refresh/update.
     * Not sure why this was necessary and the solution is probably not that elegant.
     * TODO: find a better way to have the data displayed.
     * Source: https://forums.meteor.com/t/react-router-refresh-and-reactivity/42144/5
     */
    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                lectures: this.props.course.lectures,
            });
        }
    }

    createLecture() {
        Meteor.call('createCourseLecture', this.props.courseId);
    }

    renderLectures() {
        const SortableItem = SortableElement(({value}) =>
          <li className={css(globalStyles.listItem)}><LectureListItem courseId={this.props.courseId} lectureId={value}/></li>
        );

        const SortableList = SortableContainer(({items}) => {
            return (
                <ul>
                  {items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                  ))}
                </ul>
            );
        });

        return <SortableList distance={10} items={this.state.lectures ? this.state.lectures : []} onSortEnd={this.onSortEnd} />
    }

    render() {
        return (
            <div>
                <h2>{this.props.course ? this.props.course.title : ''}</h2>
                <button
                    onClick={this.createLecture.bind(this)}
                    className="btn btn-secondary">
                    New Lecture
                </button>
                {this.renderLectures()}
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe('course', props.courseId);

    return {
        course: Courses.findOne({_id: props.courseId})
    };
})(AdminLectures);