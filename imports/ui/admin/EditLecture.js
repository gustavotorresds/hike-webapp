import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

import NewContent from './NewContent.js';
import AdminContentItem from './AdminContentItem.js';
// Drag and drop implemented with https://github.com/clauderic/react-sortable-hoc
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { Courses } from '../../api/courses.js';
import { Lectures } from '../../api/lectures.js';
import { Contents } from '../../api/contents.js';
 
class EditLecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lectureTitle: props.lecture ? props.lecture.title : '',
            contents: props.lecture ? props.lecture.contents : [],
        };

        this.onSortEnd = ({oldIndex, newIndex}) => {
            this.setState({
              contents: arrayMove(this.state.contents, oldIndex, newIndex),
            });
            Lectures.update(this.props.lectureId, {
                $set: {
                    contents: this.state.contents
                }
            });
        };
    }

    /* 
     * Using componentDidUpdate was necessary to load data on page refresh/update.
     * Not sure why this was necessary and the solution is probably not that elegant.
     * TODO: find a better way to have the data displayed.
     * Source: https://forums.meteor.com/t/react-router-refresh-and-reactivity/42144/5
     */
    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                lectureTitle: this.props.lecture.title,
                contents: this.props.lecture.contents,
            });
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
        });
    }

    renderContent() {
        const SortableItem = SortableElement(({value}) =>
          <AdminContentItem contentId={value}/>
        );

        const SortableList = SortableContainer(({items}) => {
          return (
            <ul>
              {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
              ))}
            </ul>
          );
        });
        return <SortableList distance={10} items={this.state.contents} onSortEnd={this.onSortEnd} />;
    }

    render() {
        return (
            <div className={css(style.container)}>
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

const style = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        padding: '20px',
    }
});