import { Courses } from '../imports/api/courses.js';
import { Lectures } from '../imports/api/lectures.js';
import { Contents } from '../imports/api/contents.js';
import { Comments } from '../imports/api/comments.js';

Meteor.publish('AdminUsers', function() {
	if (Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group')) {
		const u = Meteor.users.find({}, {
			fields: {
				emails: 1
			}
		});
		return u;
	}
	return [];
});

Meteor.publish('coursesBasic', function() {
	const courses = Courses.find({}, {
		fields: {
			_id: 1,
			title: 1,
		}
	});
	return courses;
});

Meteor.publish('course', function(courseId) {
	// Should only find one course with such ID.
	const course = Courses.find({_id: courseId}, {
		fields: {
			students: 0,
		}
	});
	return course;
});

// TODO: change publication name since students also need
// this in order to check whether they are enrolled.
// TODO: or else, we can add course enrollment info to student fields.
Meteor.publish('AdminCourse', function(courseId) {
	// Should only find one course with such ID.
	const course = Courses.find({_id: courseId});
	return course;
});

Meteor.publish('lectureBasic', function(lectureId) {
	const lecture = Lectures.find({_id: lectureId}, {
		fields: {
			_id: 1,
			title: 1,
		}
	});
	return lecture;
});

Meteor.publish('lecture', function(lectureId) {
	const lecture = Lectures.find({_id: lectureId});
	return lecture;
});

Meteor.publish('content', function(contentId) {
	const contents = Contents.find({_id: contentId});
	const content = contents.fetch()[0];

	const lecture = Lectures.findOne({_id: content.lectureId});

	if(Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group')) {
		return contents;
	} else if(Roles.userIsInRole(Meteor.userId(), ['student'], lecture.courseId)) {
		return contents;
	}

	return [];
});

Meteor.publish('comment', function(commentId) {
	return Comments.find({_id: commentId});
});

Meteor.publish('selfUser', function() {
	return Meteor.users.find({_id: Meteor.userId()})
});