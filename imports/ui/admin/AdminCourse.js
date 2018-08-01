import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js';

class AdminCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.course ? props.course.title : '',
			description: props.course ? props.course.description : '',
			imageUrl: props.course ? props.course.imageUrl : '',
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps !== this.props) {
			this.setState({
				title: this.props.course.title,
				description: this.props.course.description,
				imageUrl: this.props.course.imageUrl,
			});
		}
	}

	handleChange() {
		this.setState({
			title: this.refs.title.value,
			description: this.refs.description.value,
			imageUrl: this.refs.imageUrl.value,
		});
	}

	handleSubmit(event) {
		//Update Couse
		event.preventDefault();
		Meteor.call('updateCourse', this.props.courseId, this.state.title, this.state.description, this.state.imageUrl);
	}

	render() {
		return(<div>
			<div className="row">
				<div className="col-md-2">
					Course Info
				</div>
				<div className="col-md-10">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group">
							<input onChange={this.handleChange.bind(this)} ref="title" className="form-control" type="text" value={this.state.title}/>
						</div>

						<div className="form-group">
							<textarea onChange={this.handleChange.bind(this)} ref="description" className="form-control" type="text" value={this.state.description}/>
						</div>

						<div className="form-group">
							<input onChange={this.handleChange.bind(this)} ref="imageUrl" className="form-control" type="text" value={this.state.imageUrl}/>
						</div>

						<input type="submit" className="btn btn-primary" value="Save"/>
					</form>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-md-2">
					Currículo
				</div>
				<div className="col-md-10">
					<a href={FlowRouter.current().path + '/curriculum'} className="btn btn-primary">Ver Currículo</a>
				</div>
			</div>
		</div>);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('AdminCourse', props.courseId);

	return {
		course: Courses.findOne({_id: props.courseId}),
	};
})(AdminCourse);