import { Meteor } from 'meteor/meteor';
import '../imports/api/methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});

// TODO: is this the best way to publish user emails?
Meteor.publish('users', function() {
	const u = Meteor.users.find({}, {
		fields: {
			emails: 1
		}
	});
	return u;
});