import { Courses } from '../imports/api/courses.js';
import { Lectures } from '../imports/api/lectures.js';
import { Contents } from '../imports/api/contents.js';

Meteor.publish('AdminUsers', function() {
	const u = Meteor.users.find({}, {
		fields: {
			emails: 1
		}
	});
	return u;
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
	const content = Contents.find({_id: contentId});
	return content;
});