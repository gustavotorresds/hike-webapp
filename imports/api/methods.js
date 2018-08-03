import { Courses } from './courses.js';
import { Contents } from './contents.js';
import { Lectures } from './lectures.js';
import { Comments } from './comments.js';

var MP = require ("mercadopago");
var mp = new MP (Meteor.settings.private.MPPrivate);

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
            comments: [],
        });

        Courses.update(courseId,
            {
                $push: {
                    lectures: newLectureId
                }
            }
        );
    },
    'createCourse': function(title, description, photoUrl) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.insert({
            title: title,
            description: description ? description : '',
            photoUrl: photoUrl ? photoUrl : '',
            lectures: [],
            students: []
        });
    },
    'updateCourse': function(courseId, title, description, imageUrl) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
          throw new Meteor.Error(403, "Access denied");
        }

        Courses.update(courseId, {
            $set: {
                title: title,
                description: description,
                imageUrl: imageUrl,
            }
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

        Roles.addUsersToRoles(studentId, ['student'], courseId);
    },
    'buyCourse': function(studentId, courseId) {
        // TODO: implement this with credit card vendor.
        console.log('ATTEMPT FROM STUDENT ' + studentId + ' TO BUY COURSE ' + courseId);
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
    },
    'completeLecture': function(studentId, lectureId) {
        if(!studentId) {
            return;
        }

        const lecture = Lectures.findOne({_id: lectureId});
        const courseId = lecture.courseId;

        // const user = Meteor.users.findOne({_id: studentId});
        // const progress = user.progress || {};

        const path = 'progress.' + courseId + '.lectures.' + lectureId;

        Meteor.users.update(studentId, {
            $set: {
                [path]: true,
            }
        });
    },
    'createComment': function(commentText, lectureId) {
        const authorId = Meteor.userId();
        if(!authorId) {
            throw new Meteor.Error(403, "Access denied");
        }

        const commentId = Comments.insert({
            text: commentText,
            authorId: authorId,
            lectureId: lectureId,
        });

        Lectures.update(lectureId, {
            $push: {
                comments: commentId
            }
        });
    },
    'deleteComment': function(commentId) {
        const comment = Comments.findOne({_id: commentId});
        if(comment.authorId !== Meteor.userId()) {
            throw new Meteor.Error(403, "Access denied");
        }

        Lectures.update(comment.lectureId, {
            $pull: {
                comments: commentId
            }
        })
        Comments.remove({_id: commentId});
    },
    'pay': function(paymentMethodId, token) {
        console.log('GETTING PAYMENT');
        // console.log('PMID: ', paymentMethodId);
        // console.log('TOKEN: ', token);

        const user = Meteor.user();
        if(!user) {
            throw new Meteor.Error(403, 'Should be logged in');
        }

        const email = user.emails[0].address;
        console.log('EMAIL: ', email);

        var doPayment = mp.post ("/v1/payments",
        {
            "transaction_amount": 1,
            "token": token,
            "description": "Hike Teste",
            "installments": 1,
            "payment_method_id": paymentMethodId,
            "payer": {
                "email": email
            }
        });

        doPayment.then (
            function (payment) {
                console.log (payment);
            },
            function (error){
                console.log (error);
            });
    }
});