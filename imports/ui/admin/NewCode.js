/* 
 * This isClient check is a very dirty solution to a problem I ran into
 * implementing the AceEditor. Basically, the server was trying to render
 * it, and that made the app crash because AceEditor and Brace use "window",
 * which the server does not have. There's probably a more elegant way of
 * solving this by including all our components in the client folder.
 * Source: https://forums.meteor.com/t/referenceerror-window-is-not-defined/27760
 * TODO: find better solution for AceEditor issue.
 */
if(Meteor.isClient) {
	import React, { Component } from 'react';
	import { StyleSheet, css } from 'aphrodite';

	import brace from 'brace';
	import AceEditor from 'react-ace';

	const modes = ['javascript', 'html', 'css'];
	const defaultMode = modes[0];

	import 'brace/mode/javascript';
	import 'brace/mode/html';
	import 'brace/mode/css';
	import 'brace/theme/monokai';

	import { Contents } from '../../api/contents.js';
	import { Lectures } from '../../api/lectures.js';

	class NewCode extends Component {
		constructor(props) {
			super(props);
			this.state = {
				mode: 'javascript'
			}
		}

		onChange(newValue) {
		  // console.log('change', newValue);
		}

		handleNewContent(event) {
			event.preventDefault();
			const codeContent = this.refs.Editor.editor.session.getValue();

	        const newContentId = Contents.insert({
	            type: 'code',
	            core: {
	            	code: codeContent,
	            	language: this.state.mode,
	            },
	            lectureId: this.props.lectureId,
	        });

	        Lectures.update(this.props.lectureId, {
	            $push: {
	                'contents': newContentId
	            }
	        });

	        this.refs.videoUrl.value = '';
	    }

	    handleModeChange(event) {
	    	this.setState({mode: event.target.value})	
	    }


		render() {
			const modeOptions = modes.map((mode, index) => {
				return <option value={mode} key={index}>{mode}</option>;
			});

			return(
				<div>
					<form action="#" onSubmit={this.handleNewContent.bind(this)}>
						<select
							value={this.state.mode}
							onChange={this.handleModeChange.bind(this)}
							className="mb-3"
						>
							{modeOptions}
						</select>

						<AceEditor
						    mode={this.state.mode}
						    theme="monokai"
						    name="UNIQUE_ID_OF_DIV"
						    editorProps={{$blockScrolling: true}}
						    width={'800px'}
						    ref="Editor"
						/>
						<button className="btn btn-primary" type="submit">Enviar</button>
					</form>
				</div>
			);
		}
	}

	export default NewCode;
}