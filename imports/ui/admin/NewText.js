import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Editor, createEditorState } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: createEditorState(), // for empty content
		};

		this.onChange = (editorState) => {
			this.setState({ editorState });
		};
	}

	handleNewContent(event) {
        event.preventDefault();

        const editorState = this.state.editorState;
        const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());

        const newContentId = Contents.insert({
            type: 'text',
            core: renderedHTML
        });

        Lectures.update(this.props.lectureId, {
            $push: {
                'contents': newContentId
            }
        });

        this.setState({editorState: createEditorState()});
    }

    render() {
    	const editorState = this.state.editorState;

    	return(
    		<div>
	    		<h3>Rich Text</h3>
		    	<form action="#" onSubmit={this.handleNewContent.bind(this)}>
					<Editor
				        ref="editor"
				        placeholder="Seu conteúdo incrível..."
				        editorState={editorState}
				        onChange={this.onChange}
				        editorEnabled={true}/>
	                <button type="submit" className="btn btn-primary">Enviar</button>
	            </form>
            </div>
    	);
    }
}

export default NewText;