import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

class Buy extends Component {
	buyCourse(event) {
		event.preventDefault();
		Meteor.call('buyCourse', Meteor.userId(), this.props.courseId);
	}

	render() {
		return (<div className="container">
			<h1>Buy Course {this.props.courseId}</h1>

			<div className="card bg-light w-75 mb-3">
			  <div className="card-header">Informação de Pagamento</div>
			  <div className="card-body">
			    <h5 className="card-title">Light card title</h5>
			    <form onSubmit={this.buyCourse.bind(this)}>
			    	<div className="form-group">
			    		<input className="form-control" type="text" placeholder="Nome"/>
			    	</div>
			    	<div className="form-group">
			    		<input className="form-control" type="text" placeholder="Número do Cartão"/>
			    	</div>
			    	<div className="form-group">
			    		<div className="row">
			    			<div className="col-md-2">
			    				<input className="form-control" type="date" placeholder="Validade"/>
			    			</div>
			    			<div className="col-md-2">
			    				<input className="form-control" type="text" placeholder="CCV"/>
			    			</div>
			    		</div>
			    	</div>
			    	<input type="submit" className="btn btn-primary"/>
			    </form>
			  </div>
			</div>
		</div>);
	}
}

export default withTracker((props) => {
	return {

	};
})(Buy);