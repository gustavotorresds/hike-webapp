import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.js';
import Index from '../imports/ui/Index.js';
import Catalog from '../imports/ui/student/Catalog.js';
import CourseCurriculum from '../imports/ui/student/CourseCurriculum.js';
import CourseContainer from '../imports/ui/student/CourseContainer.js';
import CourseContent from '../imports/ui/student/CourseContent.js';
import AdminView from '../imports/ui/admin/AdminView.js';
import AdminMain from '../imports/ui/admin/AdminMain.js';
import AdminCourses from '../imports/ui/admin/AdminCourses.js';
import NewCourse from '../imports/ui/admin/NewCourse.js';
import AdminLectures from '../imports/ui/admin/AdminLectures.js';
import EditLecture from '../imports/ui/admin/EditLecture.js';
import AdminCourseStudents from '../imports/ui/admin/AdminCourseStudents.js';

import SignUpPage from '../imports/ui/Auth.js';

FlowRouter.route('/', {
  name: 'Index',
  action() {
    mount(AppContainer, {
      main: <Index/>,
    });
  },
});

FlowRouter.route('/courses', {
  name: 'Catalog',
  action() {
    mount(AppContainer, {
      main: <Catalog/>,
    });
  },
});

FlowRouter.route('/courses/:courseId', {
  name: 'CourseCurriculum',
  action() {
    mount(AppContainer, {
      main: <CourseCurriculum
        courseId={FlowRouter.getParam("courseId")}/>,
    });
  },
});

FlowRouter.route('/courses/:courseId/lectures/:lectureId', {
  name: 'CourseContent',
  action() {
    mount(CourseContainer, {
        courseId: FlowRouter.getParam("courseId"),
        lectureId: FlowRouter.getParam("lectureId")
    });
  },
});

FlowRouter.route('/sign-up', {
  name: 'SignUp',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('/courses');
    } else {
      mount(SignUpPage);
    }
  }
});


var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
});

// handling /admin route
adminRoutes.route('/', {
  name: 'AdminView',
  action: function() {
    mount(AdminView, {
      main: <AdminMain/>,
    });
  }
});

// handling /admin/posts
adminRoutes.route('/courses/new', {
  action: function() {
    mount(AdminView, {
      main: <NewCourse/>,
    });
  }
});

adminRoutes.route('/courses/:courseId', {
  action: function() {
    mount(AdminView, {
      main: <AdminLectures courseId={FlowRouter.getParam("courseId")}/>,
    });
  }
});

adminRoutes.route('/courses/:courseId/students', {
  action: function() {
    mount(AdminView, {
      main: <AdminCourseStudents courseId={FlowRouter.getParam("courseId")}/>,
    });
  }
});

adminRoutes.route('/courses/:courseId/lectures/:lectureId', {
  action: function() {
    mount(AdminView, {
      main: <EditLecture lectureId={FlowRouter.getParam("lectureId")}/>,
    });
  }
});
