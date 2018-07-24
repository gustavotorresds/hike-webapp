import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewVideo extends Component {
	handleNewContent(event) {
		event.preventDefault();

        const newContentId = Contents.insert({
            type: 'video',
            core: this.refs.videoUrl.value,
            lectureId: this.props.lectureId,
        });

        Lectures.update(this.props.lectureId, {
            $push: {
                'contents': newContentId
            }
        });

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