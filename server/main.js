import { Meteor } from 'meteor/meteor';
import '../imports/api/methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('users', function() {
	const u = Meteor.users.find({}, {
		fields: {
			emails: 1
		}
	});
	console.log('USERS: ', u);
	return u;
});