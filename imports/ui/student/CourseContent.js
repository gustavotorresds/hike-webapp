import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import mediumDraftImporter from 'medium-draft/lib/importer';

import { Contents } from '../../api/contents.js';

class ContentListItem extends Component {
    constructor(props) {
        super(props);

        const con = Contents.findOne({_id: this.props.contentId});
        if(con.type === 'text') {
            const html = con.core;
            this.state = {
                editorState: createEditorState(convertToRaw(mediumDraftImporter(html))),
                type: 'text',
            };

            this.onChange = (editorState) => {
            this.setState({ editorState });
        };
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
            <div className={css(style.contentItem)}>
                {content}
            </div>
        );
    }
}

class CourseContent extends Component {
    renderContents() {
        if(this.props.lecture) {
            const contentsList = this.props.lecture.contents.map((contentId) => {
                return <ContentListItem key={contentId} contentId={contentId}/>
            });

            return contentsList;
        }
    }

    render() {
        return (
            <div>
                <h2>{this.props.lecture ? this.props.lecture.title : ''}</h2>
                {this.renderContents()}
            </div>
        );
    }
}

export default withTracker((props) => {
  return {
    
  };
})(CourseContent);

const style = StyleSheet.create({
    contentItem: {
        margin: '0'
    }
});