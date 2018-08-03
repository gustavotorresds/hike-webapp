import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

class Welcome extends Component {
	render() {
		return(<div>
			Welcome
		</div>);
	}	
}

class InProcess extends Component {
	render() {
		return(<div>
			Payment in Process
		</div>);
	}	
}

class Pending extends Component {
	render() {
		return(<div>
			Payment Pending
		</div>);
	}	
}

class Rejected extends Component {
	render() {
		return(<div>
			Card Rejected
		</div>);
	}	
}

export {Welcome, InProcess, Pending, Rejected};