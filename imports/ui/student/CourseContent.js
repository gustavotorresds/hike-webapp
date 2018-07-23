/*
 * TODO: is it fine to use the method dangerouslySetInnerHTML()?
 * TODO: I don't feel good about having the content as a state. I feel like it
 * shold be a prop.
 */

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';

class ContentListItem extends Component {
    constructor(props) {
        super(props);

        // Set state according to content.
        const cont = Contents.findOne({_id: this.props.contentId});
        if(cont.type === 'text') {
            this.state = {
                rawHtml: cont.core,
                type: 'text',
            };
        } else if(cont.type === 'video') {
            this.state = {
                url: cont.core,
                type: 'video',
            };
        } else if (cont.type === 'image') {
            this.state = {
                url: cont.core,
                type: 'image',
            };
        }
    }

    render() {
        let content = null;
        if(this.state) {
            if(this.state.type === 'text') {
                content = <div dangerouslySetInnerHTML={{__html: this.state.rawHtml }}/>; 
            } else if(this.state.type === 'video') {
                content = <div className="embed-responsive embed-responsive-16by9 mb-5">
                  <iframe className="embed-responsive-item" src={this.state.url} allowFullScreen></iframe>
                </div>
            } else if(this.state.type === 'image') {
                // TODO: allow different image sizes
                content = <img className="img-fluid" src={this.state.url}/>
            }
        }

        return (
            <div className="row">
                <div className="col-md-10">
                    <div className={css(style.contentItem)}>
                        {content}
                    </div>
                </div>
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

// import { convertToRaw } from 'draft-js';
// import { Editor, createEditorState } from 'medium-draft';
// import mediumDraftImporter from 'medium-draft/lib/importer';
// constructor(props) {
//     super(props);

//     const con = Contents.findOne({_id: this.props.contentId});
//     if(con.type === 'text') {
//         const html = con.core;
//         this.state = {
//             // editorState: createEditorState(convertToRaw(mediumDraftImporter(html))),
//             rawHtml: html,
//             type: 'text',
//         };

//         // this.onChange = (editorState) => {
//         //     this.setState({ editorState });
//         // };
//     } else if(con.type === 'video') {
//         console.log('Displaying a video');
//         this.state = {
//             url: con.core,
//             type: 'video',
//         }
//     }
// }
//
// content = <Editor
//     editorState={this.state ? this.state.editorState : ''}
//     onChange={this.onChange}
//     editorEnabled={false}/>;