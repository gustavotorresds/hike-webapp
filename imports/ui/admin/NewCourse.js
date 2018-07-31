import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Courses } from '../../api/courses.js'
 
// Task component - represents a single todo item
class NewCourse extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const title = this.refs.courseTitle.value;
        const description = this.refs.courseDescription.value;
        const imageUrl = this.refs.courseImageUrl.value;
        
        if(title) {
            Meteor.call('createCourse', title, description, imageUrl);
            this.refs.courseTitle.value = '';
            this.refs.courseDescription.value = '';
            this.refs.courseImageUrl.value = '';
        }
    }

    render() {
        return (
            <div>
              <h1>Novo Curso</h1>
              <form action="#" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <input className="form-control" type="text" ref="courseTitle"/>
                  </div>

                  <div className="form-group">
                    <textarea className="form-control" rows="3" ref="courseDescription"></textarea>
                  </div>

                  <div className="form-group">
                    <input className="form-control" type="url" ref="courseImageUrl"/>
                  </div>
                  
                  <input className="btn btn-primary" type="submit"/>
              </form>
            </div>
        );
    }
}

export default withTracker(() => {
    return {

    };
})(NewCourse);