import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewImage extends Component {
	handleNewContent(event) {
		event.preventDefault();
		Meteor.call(
			'addContentToLecture',
			'image',
			this.refs.imageUrl.value,
			this.props.lectureId);

        this.refs.imageUrl.value = '';
    }

	render() {
		return(
			<div>
				<form action="#" onSubmit={this.handleNewContent.bind(this)}>
					<div className="form-group">
						<input placeholder="URL da imagem" ref="imageUrl" type="text" className="form-control"/>
					</div>
					<button className="btn btn-primary" type="submit">Enviar</button>
				</form>
			</div>
		);
	}
}

export default NewImage;