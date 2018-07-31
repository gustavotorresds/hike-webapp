import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

import { Courses } from '../../api/courses.js';

class StudentListItem extends Component {
	removeStudent() {
		Meteor.call('removeStudentFromCourse', this.props.studentId, this.props.courseId);
	}

	render() {
		const studentItem = this.props.student && this.props.student.emails ?
			this.props.student.emails[0].address :
			null;

		return <li className={css(style.studentItem)}>
			<div className="row justify-content-between">
				<div className="col">
					{studentItem}
				</div>

				<div className="col text-right">
					<button className="btn btn-danger" onClick={this.removeStudent.bind(this)}>Remove</button>
				</div>
			</div>
		</li>;
	}
}

const SLIWithTracker = withTracker((props) => {
	return {
		student: Meteor.users.findOne({_id: props.studentId}),
	}
})(StudentListItem);

class AdminCourseStudents extends Component {
	handleSubmit(event) {
		event.preventDefault();
		const email = this.refs.studentEmail.value;
		const student = Meteor.users.findOne({ "emails.address" : email });

		if(student) {
			console.log('Adding student');
			Meteor.call('addStudentToCourse', student._id, this.props.courseId);
		} else {
			// TODO: send email
			console.log('Couldn\'t find student :/');
		}
	}

	renderStudentList() {
		if(this.props.course) {
			const students = this.props.course.students;
			const studentsList = students.map((studentId) => {
				return <SLIWithTracker
					key={studentId}
					studentId={studentId}
					courseId={this.props.courseId}/>
			});

			return studentsList;
		}

		return '';
	}

	render() {
		return <div>
			<button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#newStudentModal">
			  Novo Aluno
			</button>

			<div className="modal fade" id="newStudentModal" tabIndex="-1" role="dialog" aria-labelledby="newStudentModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="newStudentModalLabel">Adicionar Aluno</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <form action="#" onSubmit={this.handleSubmit.bind(this)}>
			        	<input ref="studentEmail" className="form-control" type="text"/>
			        	<input className="btn btn-primary" type="submit"/>
			        </form>
			      </div>
			    </div>
			  </div>
			</div>

			<ul>
				{this.renderStudentList()}
			</ul>
		</div>;
	}
}

export default withTracker(function(props) {
	Meteor.subscribe('AdminUsers');
	Meteor.subscribe('AdminCourse', props.courseId);

	return {
		course: Courses.findOne({_id: props.courseId})
	};
})(AdminCourseStudents);

const style = StyleSheet.create({
	studentItem: {
		backgroundColor: '#F0F0F0',
		padding: '15px',
		borderBottom: '1px solid #E5E5E5',
	}
});