import { Meteor } from 'meteor/meteor';
import { Courses } from '../imports/api/courses.js';

Meteor.startup(() => {
  // code to run on server at startup
});

var bodyParser = require('body-parser');
var mercadopago = require('mercadopago');

// Add two middleware calls. The first attempting to parse the request body as
// JSON data and the second as URL encoded data.
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/pay/:courseId/:userId', function(params, req, res, next) {
	const courseId = params.courseId;
	const userId = params.userId;

	console.log('COURSE: ', courseId);
	console.log('USER: ', userId);

 	const token = req.body.token;
	const payment_method_id = req.body.payment_method_id;
	const installments = req.body.installments;
	const issuer_id = req.body.issuer_id;

	mercadopago.configurations.setAccessToken(Meteor.settings.private.MPPrivate);

	const user = Meteor.users.findOne({_id: userId});
	const email = user.emails[0].address;

	var payment_data = {
	  transaction_amount: 5,
	  token: token,
	  description: 'Hike - Desenvolvimento Web',
	  installments: parseInt(installments),
	  payment_method_id: payment_method_id,
	  issuer_id: issuer_id,
	  payer: {
	    email: email
	  }
	};

	// Armazena e envia o pagamento
	mercadopago.payment.save(payment_data).then(Meteor.bindEnvironment(function (data) {
	  const status = data.body.status;
	  const payerEmail = data.body.payer.email;

	  if(status === 'approved') {
	  	Courses.update(courseId, {
            $addToSet: {
                'students': userId
            } 
        });
        Roles.addUsersToRoles(userId, ['student'], courseId);

	  	res.writeHead(301, {Location: "/welcome"});
	  } else if (status === 'pending') {
	  	res.writeHead(301, {Location: "/pending"});
	  } else if (status === 'in_process') {
	  	res.writeHead(301, {Location: "/in-process"});
	  } else if (status === 'rejected') {
	  	res.writeHead(301, {Location: "/rejected"});
	  } else {
	  	res.writeHead(301, {Location: "/"});
	  }

	  res.end();
	})).catch(function (error) {
	  console.log('ERROR: ', error);
	});
});