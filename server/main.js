import { Meteor } from 'meteor/meteor';
import '../imports/api/methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});

// console.log('VRAU');

// var users = [
//       {name:"Admin",email:"time@hikeacademy.com.br",roles:['admin']}
//     ];

// _.each(users, function (user) {
//   var id;

//   id = Accounts.createUser({
//     email: user.email,
//     password: "admin",
//     profile: { name: user.name }
//   });

//   if (user.roles.length > 0) {
//     // Need _id of existing user record so this call must come
//     // after `Accounts.createUser` or `Accounts.onCreate`
//     Roles.addUsersToRoles(id, user.roles, 'default-group');
//   }
// });