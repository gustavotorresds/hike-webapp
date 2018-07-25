import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewCode extends Component {
	handleNewContent(event) {
		event.preventDefault();

        const newContentId = Contents.insert({
            type: 'code',
            // core: this.refs.videoUrl.value,
            // lectureId: this.props.lectureId,
        });

        Lectures.update(this.props.lectureId, {
            $push: {
                'contents': newContentId
            }
        });

        // this.refs.videoUrl.value = '';
    }


	render() {
		return(
			<div>
				<form action="#" onSubmit={this.handleNewContent.bind(this)}>
					<div className="form-group">
						
					</div>
					<button className="btn btn-primary" type="submit">Enviar</button>
				</form>
			</div>
		);
	}
}

export default NewCode;