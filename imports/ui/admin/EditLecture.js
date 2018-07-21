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

    renderContent() {
        const contentList = this.props.lecture ? this.props.lecture.contents.map((contentId) => {
            return <ContentItem key={contentId} contentId={contentId}/>
        }) : null;

        return <ul>{contentList}</ul>;
    }

    render() {
        return (
            <div>
              <h1>{this.props.lecture ? this.props.lecture.title : ''}</h1>
              
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