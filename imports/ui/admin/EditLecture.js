import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import NewContent from './NewContent.js';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import mediumDraftImporter from 'medium-draft/lib/importer';

import { Courses } from '../../api/courses.js'
import { Lectures } from '../../api/lectures.js'
import { Contents } from '../../api/contents.js'

class ContentItem extends Component {
    constructor(props) {
        super(props);

        const con = Contents.findOne({_id: this.props.contentId});
        if(con) {
            if(con.type === 'text') {
                const html = con.core;
                this.state = {
                    editorState: createEditorState(convertToRaw(mediumDraftImporter(html))),
                    type: 'text'
                };
                this.onChange = (editorState) => {
                    this.setState({ editorState });
                };
            }
        }
    }

    render() {
        let content = null;
        if(this.state && this.state.type === 'text') {
            content = <Editor
                    editorState={this.state ? this.state.editorState : ''}
                    onChange={this.onChange}
                    editorEnabled={false}/>;
        }

        return (
            <li>
                {content}
            </li>
        );
    }
}
 
// Task component - represents a single todo item
class EditLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectureTitle: props.lecture ? props.lecture.title : ''
        }
    }

    updateTitle(event) {
        this.setState({lectureTitle: event.target.value});
    }

    handleLectureTitleChange(event) {
        event.preventDefault();

        const newTitle = this.refs.lectureTitle.value;

        Lectures.update(this.props.lectureId, {
            $set: {
                title: newTitle
            }
        })
    }

    renderContent() {
        const contentList = this.props.lecture ?
            this.props.lecture.contents.map((contentId) => {
                const content = Contents.findOne({_id: this.props.contentId});

                return <ContentItem key={contentId} contentId={contentId}/>;
            }) : null;

        return <ul>{contentList}</ul>;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLectureTitleChange.bind(this)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.lectureTitle}
                            ref="lectureTitle"
                            onChange={this.updateTitle.bind(this)}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-secondary">Enviar</button>
                </form>

                <NewContent lectureId={this.props.lectureId}/>

                {this.renderContent()}
            </div>
        );
    }
}

export default withTracker((props) => {
    return {
        lecture: Lectures.findOne({_id: props.lectureId})
    };
})(EditLecture);