import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.js';
import Index from '../imports/ui/Index.js';
import Catalog from '../imports/ui/student/Catalog.js';
import CourseCurriculum from '../imports/ui/student/CourseCurriculum.js';
import Course from '../imports/ui/student/Course.js';
import AdminView from '../imports/ui/admin/AdminView.js';
import AdminMain from '../imports/ui/admin/AdminMain.js';
import AdminCourses from '../imports/ui/admin/AdminCourses.js';
import NewCourse from '../imports/ui/admin/NewCourse.js';
import AdminLectures from '../imports/ui/admin/AdminLectures.js';
import EditLecture from '../imports/ui/admin/EditLecture.js';


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
      main: <CourseCurriculum courseId={FlowRouter.getParam("courseId")}/>,
    });
  },
});

FlowRouter.route('/courses/:courseId/lectures/:lectureId', {
  name: 'CourseCurriculum',
  action() {
    mount(AppContainer, {
      main: <Course
        courseId={FlowRouter.getParam('courseId')}
        lectureId={FlowRouter.getParam('lectureId')}
      />,
    });
  },
});

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin'
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

adminRoutes.route('/courses/:courseId/lectures/:lectureId', {
  action: function() {
    mount(AdminView, {
      main: <EditLecture lectureId={FlowRouter.getParam("lectureId")}/>,
    });
  }
});

// FlowRouter.route('/admin/', {
//   name: 'AdminView',
//   action() {
//     mount(AppContainer, {
//       main: <AdminView/>,
//     });
//   }
// });

// FlowRouter.route('/admin/courses', {
//   name: 'AdminCourses List',
//   action() {
//     mount(AppContainer, {
//       main: <AdminCourses/>,
//     });
//   },
// });

// FlowRouter.route('/admin/courses/new', {
//   name: 'New Course',
//   action() {
//     mount(AppContainer, {
//       main: <NewCourse/>,
//     });
//   },
// });

// FlowRouter.route('/admin/courses/:courseId', {
//   name: 'AdminLectures',
//   action() {
//     mount(AppContainer, {
//       main: <AdminLectures courseId={FlowRouter.getParam("courseId")}/>,
//     });
//   },
// });

// FlowRouter.route('/admin/courses/:courseId/lectures/:lectureId', {
//   name: 'Edit Lecture',
//   action() {
//     mount(AppContainer, {
//       main: <EditLecture lectureId={FlowRouter.getParam("lectureId")}/>,
//     });
//   },
// });