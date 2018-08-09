import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Lectures } from '../../api/lectures.js';
import { Courses } from '../../api/courses.js';
 
class LectureListItemRaw extends Component {
    render() {
        const lecItem = this.props.lecture ?
                <a
                    className={css(style.lectureLink)}
                    href={'/courses/' + this.props.courseId + '/lectures/' + this.props.lecture._id}>
                        {this.props.lecture.title}
                </a> : '';

        return (<span>
            {lecItem}
        </span>);
    }
}

const LectureListItem = withTracker((props) => {
    Meteor.subscribe('lecture', props.lectureId);

    return {
        lecture: Lectures.findOne({_id: props.lectureId}),
    }
})(LectureListItemRaw);

class CourseNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: this.currStep(),
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                activeStep: this.currStep(),
            });
        }
    }

    currStep() {
        if(this.props.course) {
            const lectures = this.props.course.lectures;
            return lectures.indexOf(this.props.lectureId);    
        }
        return 0;
    }

    renderLectures() {
        if(!this.props.course) {
            return '';
        }

        const steps = this.props.course.lectures;

        if(this.props.course) {
            return <Stepper activeStep={this.state.activeStep} orientation="vertical">
              {steps.map((lectureId, index) => {
                return (
                  <Step key={lectureId}>
                    <StepLabel>
                        <LectureListItem
                            courseId={this.props.course._id}
                            lectureId={lectureId}
                        />
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>;
        }

        return '';
    }

    render() {
        return (
            <div>
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
    lectureList: {
        listStyle: 'none',
        padding: '0'
    },
    lectureLink: {
        display: 'block',
        color: '#5B5B5B',
        padding: '10px 0 10px 10px',
        fontSize: '12pt',
        margin: '0',
        ':hover': {
            textDecoration: 'none',
        },
    },
    highlight: {
        fontWeight: 'bold',
        backgroundColor: 'rgba(112, 190, 255, 0.5)',
        ':hover': {
            color: 'black',
        },
    },
});