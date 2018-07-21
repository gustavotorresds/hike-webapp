import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Contents } from '../../api/contents.js';

class ContentListItem extends Component {
    render() {
        const con = Contents.findOne({_id: this.props.contentId});

        return (
            <div>
                {con.core}
            </div>
        );
    }
}

class CourseMain extends Component {
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
                <a href="#">Prev</a>
                <a href="#">Next</a>

                <div>
                    Content
                    {this.renderContents()}
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
  return {
    
  };
})(CourseMain);