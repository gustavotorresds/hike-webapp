import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';

class ContentListItem extends Component {
    render() {
        const con = Contents.findOne({_id: this.props.contentId});

        return (
            <div className={css(style.contentItem)}>
                {con.core}
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
        margin: '20px 0'
    }
});