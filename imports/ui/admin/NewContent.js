import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewContent extends Component {
	handleNewContent(event) {
        event.preventDefault();

        const contentCore = this.refs.content.value;

        const newContentId = Contents.insert({
            type: 'text',
            core: contentCore
        });

        Lectures.update(this.props.lectureId, {
            $push: {
                'contents': newContentId
            }
        });

        this.refs.content.value = '';
    }

	render() {
		return(
			<form action="#" onSubmit={this.handleNewContent.bind(this)}>
				<div className="form-group">
					<textarea className="form-control" ref="content" rows="3"></textarea>
				</div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
		);
	}
}

export default NewContent;