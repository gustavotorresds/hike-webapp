import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewImage extends Component {
	handleNewContent(event) {
		event.preventDefault();

        const newContentId = Contents.insert({
            type: 'image',
            core: this.refs.imageUrl.value,
            lectureId: this.props.lectureId,
        });

        Lectures.update(this.props.lectureId, {
            $push: {
                'contents': newContentId
            }
        });

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