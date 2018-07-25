import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewVideo extends Component {
	handleNewContent(event) {
		event.preventDefault();

		Meteor.call(
			'addContentToLecture',
			'video',
			this.refs.videoUrl.value,
			this.props.lectureId
		);

        this.refs.videoUrl.value = '';
    }

	render() {
		return(
			<div>
				<form action="#" onSubmit={this.handleNewContent.bind(this)}>
					<div className="form-group">
						<input placeholder="URL do vídeo" ref="videoUrl" type="text" className="form-control"/>
					</div>
					<button className="btn btn-primary" type="submit">Enviar</button>
				</form>
			</div>
		);
	}
}

export default NewVideo;