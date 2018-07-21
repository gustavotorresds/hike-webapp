import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Courses } from '../../api/courses.js'
import { Lectures } from '../../api/lectures.js'
import { Contents } from '../../api/contents.js'

class ContentItem extends Component {
    render() {
        const content = Contents.findOne({_id: this.props.contentId});

        return (
            <li>
                {content.core}
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
                    <input
                        type="text"
                        value={this.state.lectureTitle}
                        ref="lectureTitle"
                        onChange={this.updateTitle.bind(this)}
                    />
                    <input type="submit"/>
                </form>
              
                <form action="#" onSubmit={this.handleNewContent.bind(this)}>
                    <textarea ref="content"></textarea>
                    <input type="submit"/>
                </form>

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