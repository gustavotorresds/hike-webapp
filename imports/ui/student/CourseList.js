import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
// Task component - represents a single todo item
class CourseList extends Component {
    render() {
        return (
            <div>
                <h1>Aqui estão nossos cursos</h1>
            </div>
        );
    }
}

export default withTracker(() => {
  return {

  };
})(CourseList);