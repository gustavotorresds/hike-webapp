import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import mediumDraftImporter from 'medium-draft/lib/importer';
import mediumDraftExporter from 'medium-draft/lib/exporter';

import { Lectures } from '../../api/lectures.js';
import { Contents } from '../../api/contents.js';

class AdminTextItem extends Component {
    constructor(props) {
        super(props);

        const html = this.props.content.core;
        this.state = {
            editorState: createEditorState(convertToRaw(mediumDraftImporter(html))),
            editMode: false,
        }

        this.onChange = (editorState) => {
            this.setState({ editorState });
        };
    }

    editContent() {
        this.setState({editMode: true});
    }

    saveContent() {
        const editorState = this.state.editorState;
        const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());

        Contents.update(this.props.content._id, {
            $set: {
                core: renderedHTML
            }
        })

        this.setState({editMode: false});
    }

    removeContent() {
        const contentId = this.props.content._id;
        const lectureId = this.props.content.lectureId;
        Lectures.update(lectureId, {
            $pull: {
                contents: contentId
            }
        });
        Contents.remove(contentId);
    }

    render() {
        return (
             <div className="row">
                 <div className="col-md-2">
                    Text
                 </div>
                 <div className="col-md-8">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        editorEnabled={this.state.editMode}/>
                 </div>
                 <div className="col-md-2">
                     {this.state.editMode ?
                         <button onClick={this.saveContent.bind(this)} className="btn btn-success mb-3">Salvar</button> :
                         <button onClick={this.editContent.bind(this)} className="btn btn-warning mb-3">Editar</button>
                     }
                     <button onClick={this.removeContent.bind(this)} className="btn btn-danger">Remover</button>
                 </div>
             </div>
        );
    }
}

class AdminVideoItem extends Component {
    removeContent() {
        const contentId = this.props.content._id;
        const lectureId = this.props.content.lectureId;
        Lectures.update(lectureId, {
            $pull: {
                contents: contentId
            }
        });
        Contents.remove(contentId);
        
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    Video
                </div>
                <div className="col-md-8">
                    <div className="embed-responsive embed-responsive-16by9 mb-5">
                        <iframe className="embed-responsive-item" src={this.props.content.core} allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-md-2">
                    <button onClick={this.removeContent.bind(this)} className="btn btn-danger">Remover</button>
                </div>
            </div>
        );
    }    
}

class AdminImageItem extends Component {
    removeContent() {
        const contentId = this.props.content._id;
        const lectureId = this.props.content.lectureId;
        Lectures.update(lectureId, {
            $pull: {
                contents: contentId
            }
        });
        Contents.remove(contentId);
        
    }

    render() {
        return (
             <div className="row">
                 <div className="col-md-2">
                    Image
                 </div>
                 <div className="col-md-8">
                    <img className="img-fluid" src={this.props.content.core}/>
                 </div>
                 <div className="col-md-2">
                     <button onClick={this.removeContent.bind(this)} className="btn btn-danger">Remover</button>
                 </div>
             </div>
        );
    }    
}

class AdminContentItem extends Component {
	render() {
        let contentDisplay = null;

        if(this.props) {
            const content = this.props.content;

            if(content.type === 'text') {
                contentDisplay = <AdminTextItem content={content}/>;
            } else if(content.type === 'video') {
                contentDisplay = <AdminVideoItem content={content}/>;
            } else if(content.type === 'image') {
                contentDisplay = <AdminImageItem content={content}/>;
            }
        }

        return (<li className={css(style.container)}>
            {contentDisplay}
        </li>);
    }
}

export default withTracker((props) => {
	return {
        content: Contents.findOne({_id: props.contentId}),
	};
})(AdminContentItem);

const style = StyleSheet.create({
	container: {
		marginTop: '20px',
		backgroundColor: 'white',
		padding: '20px',
        ':hover': {
            cursor: 'grab',
            boxShadow: '0 2px',
        },
	}
});