import React, { Component } from 'react';

import { StyleSheet, css } from 'aphrodite';
import globalStyles from '../globalStyles.js';

import AdminCourses from './AdminCourses.js';

export default class AdminNav extends Component {
	render() {
		return (
			<div>
				<AdminCourses/>
				<a className="btn btn-secondary" href="/admin/courses/new">Novo Curso</a>
			</div>
		);
	}
}