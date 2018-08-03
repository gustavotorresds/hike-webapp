import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.js';
import Index from '../imports/ui/Index.js';
import Catalog from '../imports/ui/student/Catalog.js';
import Buy from '../imports/ui/student/Buy.js';
import CourseCurriculum from '../imports/ui/student/CourseCurriculum.js';
import CourseContainer from '../imports/ui/student/CourseContainer.js';
import CourseContent from '../imports/ui/student/CourseContent.js';
import AdminView from '../imports/ui/admin/AdminView.js';
import AdminMain from '../imports/ui/admin/AdminMain.js';
import AdminCourses from '../imports/ui/admin/AdminCourses.js';
import NewCourse from '../imports/ui/admin/NewCourse.js';
import AdminCourse from '../imports/ui/admin/AdminCourse.js';
import AdminLectures from '../imports/ui/admin/AdminLectures.js';
import EditLecture from '../imports/ui/admin/EditLecture.js';
import AdminCourseStudents from '../imports/ui/admin/AdminCourseStudents.js';

import {Welcome, InProcess, Pending, Rejected} from '../imports/ui/student/PaymentResults.js';

import SignUpPage from '../imports/ui/Auth.js';

Accounts.onLogin(function() {
  const currRoute = FlowRouter.current();
  if(currRoute) {
    const params = currRoute.params;
    const courseId = params.courseId;
    
    if(courseId) {
      if(currRoute.path.indexOf('buy') === -1) {
        FlowRouter.go('/courses/' + courseId);
      } else {
        FlowRouter.go('/buy/' + courseId);
      }
      return;
    }  
  }
  
  FlowRouter.go('/');
});

Accounts.onLogout(function() {
  FlowRouter.go('/');
});

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
    // FlowRouter.go('/courses/acyzubdzudcFcLZwz');
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

FlowRouter.route('/sign-up/buy/:courseId', {
  name: 'BuySignUp',
  action() {
    mount(SignUpPage);
  }
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

FlowRouter.route('/buy/:courseId', {
  name: 'Buy',
  action(){
    const courseId = FlowRouter.getParam('courseId');
    if(Meteor.userId()) {
      if(Roles.userIsInRole(Meteor.userId(), ['student'], courseId)) {
        FlowRouter.go('/courses/' + courseId);
      } else {
        mount(AppContainer, {
          main: <Buy courseId={courseId}/>,
        });
      }
    } else {
      FlowRouter.go('/sign-up/buy/' + courseId);
    }
  }
});

FlowRouter.route('/welcome', {
  name: 'Welcome',
  action() {
    mount(AppContainer, {
      main: <Welcome/>,
    });
  },
});

FlowRouter.route('/in-process', {
  name: 'In Process',
  action() {
    mount(AppContainer, {
      main: <InProcess/>,
    });
  },
});

FlowRouter.route('/pending', {
  name: 'Pending',
  action() {
    mount(AppContainer, {
      main: <Pending/>,
    });
  },
});

FlowRouter.route('/rejected', {
  name: 'Rejected',
  action() {
    mount(AppContainer, {
      main: <Rejected/>,
    });
  },
});

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function() {
    if(!Meteor.userId()) {
      FlowRouter.go('/sign-up');
    }
  }],
});

// handling /admin route
adminRoutes.route('/', {
  name: 'AdminView',
  action: function() {
    mount(AdminView, {
      main: <AdminMain courseId={FlowRouter.getParam('courseId')}/>,
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
      main: <AdminCourse courseId={FlowRouter.getParam('courseId')}/>,
    });
  }
});

adminRoutes.route('/courses/:courseId/curriculum', {
  action: function() {
    mount(AdminView, {
      main: <AdminLectures courseId={FlowRouter.getParam('courseId')}/>,
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
