import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Lectures } from '../../api/lectures.js';
import { Comments } from '../../api/comments.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CommentRaw extends Component {
	deleteComment() {
		Meteor.call('deleteComment', this.props.commentId);
	}

	isAuthor() {
		if(!this.props.comment) {
			return false;
		}
		return (Meteor.userId() === this.props.comment.authorId);
	}

	render() {
		return(
			<div className="card mb-3">
				<div className="card-body">
					<p>{this.props.comment ? this.props.comment.text : ''}</p>
					{this.isAuthor() ?
						<FontAwesomeIcon className={css(style.hoverable)} icon={faTrash} onClick={this.deleteComment.bind(this)}/> :
						''
					}
				</div>
			</div>
		);
	}
}

const Comment = withTracker((props) => {
	Meteor.subscribe('comment', props.commentId);
	return {
		comment: Comments.findOne({_id: props.commentId}),
	};
})(CommentRaw);


class LectureComments extends Component {
	renderComments() {
		const comments = this.props.lecture.comments || [];
		return comments.map((commentId, index) => {
			return <Comment key={index} commentId={commentId}/>
		});
	}

	submitComment(event) {
		event.preventDefault();
		const commentText = this.refs.commentText.value;
		Meteor.call('createComment', commentText, this.props.lectureId);
		this.refs.commentText.value = '';
	}

	render() {
		return(<div className="card mb-5">
		  <div className="card-header">
		    Discussão
		  </div>
		  <div className="card-body">
		    <h5 className="card-title">Escrever Comentário</h5>
		    <form action="#" className="mb-5" onSubmit={this.submitComment.bind(this)}>
		    	<div className="form-group">
		    		<textarea ref="commentText" className="form-control" type="text"/>
		    	</div>
		    	<input type="submit" className="btn btn-success" value="Enviar"/>
		    </form>
		    
		    {this.renderComments()}
		  </div>
		</div>);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('lecture', props.lectureId);

	return {
		lecture: Lectures.findOne({_id: props.lectureId}),
	};
})(LectureComments);

const style = StyleSheet.create({
	hoverable: {
		':hover': {
			cursor: 'pointer',
		},
	},
});