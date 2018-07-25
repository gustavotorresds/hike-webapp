import { Courses } from './courses.js';
import { Contents } from './contents.js';
import { Lectures } from './lectures.js';

Meteor.methods({
	'addContentToLecture': function(type, core, lectureId) {
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
        Contents.update(contentId, {
            $set: {
                core: core
            }
        });
    },
    'updateLectureTitle': function(lectureId, newTitle) {
        Lectures.update(lectureId, {
            $set: {
                title: newTitle
            }
        });
    },
    'updateLectureContents': function(lectureId, contentIds) {
        Lectures.update(lectureId, {
            $set: {
                contents: contentIds
            }
        });
    },
    'updateCourseLectures': function(courseId, lectureIds) {
        Courses.update(courseId, {
            $set: {
                lectures: lectureIds
            }
        });
    },
    'createCourseLecture': function(courseId) {
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
        Courses.insert({
            title: title,
            lectures: []
        });
    }
});