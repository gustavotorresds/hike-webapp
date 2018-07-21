import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Courses } from '../../api/courses.js'
 
// Task component - represents a single todo item
class NewCourse extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const title = this.refs.courseTitle.value;
        if(title) {
            Courses.insert({
                title: title,
                lectures: []
            });

            this.refs.courseTitle.value = '';
        }
    }

    render() {
        return (
            <div>
              <h1>Novo Curso</h1>
              <form action="#" onSubmit={this.handleSubmit.bind(this)}>
                  <input type="text" ref="courseTitle"/>
                  <input type="submit"/>
              </form>
            </div>
        );
    }
}

export default withTracker(() => {
    return {

    };
})(NewCourse);