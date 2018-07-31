import { Courses } from './courses.js';
import { Contents } from './contents.js';
import { Lectures } from './lectures.js';

Meteor.methods({
	'addContentToLecture': function(type, core, lectureId) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

		const newContentId = Contents.insert({
            type: type,
            core: core,
            lectureId: lectureId,
        });

        Lectures.update(lectureId, {
            $push: {
                'contents': newContentId
            }
        });
	},
    'removeLectureContent': function(contentId) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        const content = Contents.findOne({_id: contentId});
        const lectureId = content.lectureId;

        Lectures.update(lectureId, {
            $pull: {
                contents: contentId
            }
        });
        Contents.remove(contentId);
    },
    'updateContent': function(contentId, core) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Contents.update(contentId, {
            $set: {
                core: core
            }
        });
    },
    'updateLectureTitle': function(lectureId, newTitle) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Lectures.update(lectureId, {
            $set: {
                title: newTitle
            }
        });
    },
    'updateLectureContents': function(lectureId, contentIds) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Lectures.update(lectureId, {
            $set: {
                contents: contentIds
            }
        });
    },
    'updateCourseLectures': function(courseId, lectureIds) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.update(courseId, {
            $set: {
                lectures: lectureIds
            }
        });
    },
    'createCourseLecture': function(courseId) {
        var loggedInUser = Meteor.user()
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        let newLectureId = Lectures.insert({
            title: "New Lecture",
            contents: [],
            courseId: courseId,
        });

        Courses.update(courseId,
            {
                $push: {
                    lectures: newLectureId
                }
            }
        );
    },
    'createCourse': function(title) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.insert({
            title: title,
            lectures: [],
            students: []
        });
    },
    'addStudentToCourse': function(studentId, courseId) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.update(courseId, {
            $addToSet: {
                'students': studentId
            } 
        });
    },
    'removeStudentFromCourse': function(studentId, courseId) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.update(courseId, {
            $pull: {
                'students': studentId
            } 
        });
    }
});