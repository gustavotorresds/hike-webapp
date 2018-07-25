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

        Meteor.call(
            'addContentToLecture',
            'text',
            renderedHTML,
            this.props.lectureId
        );

        this.setState({editorState: createEditorState()});
    }

    render() {
    	const editorState = this.state.editorState;

    	return(
    		<div className={css(style.container)}>
		    	<form action="#" onSubmit={this.handleNewContent.bind(this)}>
                    <div className={'mb-4 ' + css(style.editorContainer)}>
                        <Editor
                            ref="editor"
                            placeholder="Seu conteúdo incrível..."
                            editorState={editorState}
                            onChange={this.onChange}
                            editorEnabled={true}/>
                    </div>
	                <button type="submit" className="btn btn-primary">Enviar</button>
	            </form>
            </div>
    	);
    }
}

export default NewText;

const style = StyleSheet.create({
    editorContainer: {
        border: '1px solid #ced4da',
    }
});