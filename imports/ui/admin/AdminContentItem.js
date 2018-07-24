import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import mediumDraftImporter from 'medium-draft/lib/importer';
import mediumDraftExporter from 'medium-draft/lib/exporter';

import { Lectures } from '../../api/lectures.js';
import { Contents } from '../../api/contents.js';

class AdminContentItem extends Component {
	constructor(props) {
        super(props);

        const con = Contents.findOne({_id: this.props.contentId});
        if(con) {
            if(con.type === 'text') {
                const html = con.core;
                this.state = {
                    editorState: createEditorState(convertToRaw(mediumDraftImporter(html))),
                    type: 'text',
                    editMode: false,
                };
                this.onChange = (editorState) => {
                    this.setState({ editorState });
                };
            }
        }
    }

    editContent() {
    	this.setState({editMode: true});
    }

    saveContent() {
    	const editorState = this.state.editorState;
		const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());

    	Contents.update(this.props.contentId, {
    		$set: {
		        core: renderedHTML
    		}
    	})

    	this.setState({editMode: false});
    }

    removeContent() {
    	const contentId = this.props.contentId;
    	const con = Contents.findOne({_id: contentId});
    	if(con) {
    		const lectureId = con.lectureId;
    		Lectures.update(lectureId, {
    			$pull: {
    				contents: contentId
    			}
    		});
    		Contents.remove(contentId);
    	}
    }

    render() {
        let content = null;
        let type = 'Type';
        if(this.state) {
        	if(this.state.type === 'text') {
        		content = <Editor
                    editorState={this.state ? this.state.editorState : ''}
                    onChange={this.onChange}
                    editorEnabled={this.state.editMode}/>;
                type = 'Text';	
        	}
        }

        return (
            <li className={css(style.container)}>
            	<div className="row">
	            	<div className="col-md-2">
            			{type}
            		</div>
            		<div className="col-md-8">
            			{content}
            		</div>
            		<div className="col-md-2">
            			{this.state.editMode ?
            				<button onClick={this.saveContent.bind(this)} className="btn btn-success mb-3">Salvar</button> :
            				<button onClick={this.editContent.bind(this)} className="btn btn-warning mb-3">Editar</button>
            			}
            			<button onClick={this.removeContent.bind(this)} className="btn btn-danger">Remover</button>
            		</div>
            	</div>
            </li>
        );
    }
}

export default withTracker((props) => {
	return {

	};
})(AdminContentItem);

const style = StyleSheet.create({
	container: {
		marginTop: '20px',
		backgroundColor: 'white',
		padding: '20px',
	}
});