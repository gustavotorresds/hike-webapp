import { Meteor } from 'meteor/meteor';
import '../imports/api/methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});

var bodyParser = require('body-parser');
var mercadopago = require('mercadopago');

// Add two middleware calls. The first attempting to parse the request body as
// JSON data and the second as URL encoded data.
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/pay/:userId', function(params, req, res, next) {
	const userId = params.userId;

 	const token = req.body.token;
	const payment_method_id = req.body.payment_method_id;
	const issuer_id = req.body.issuer_id;

	mercadopago.configurations.setAccessToken(Meteor.settings.private.MPPrivate);

	const user = Meteor.users.findOne({_id: userId});
	const email = user.emails[0].address;

	var payment_data = {
	  transaction_amount: 5,
	  token: token,
	  description: 'Hike - Desenvolvimento Web',
	  payment_method_id: payment_method_id,
	  issuer_id: issuer_id,
	  payer: {
	    email: email
	  }
	};

	// Armazena e envia o pagamento
	mercadopago.payment.save(payment_data).then(function (data) {
	  const status = data.body.status;
	  const payerEmail = data.body.payer.email;

	  if(status === 'approved') {
	  	res.writeHead(301, {Location: "/welcome"});
	  } else if (status === 'pending') {
	  	res.writeHead(301, {Location: "/pending"});
	  } else if (status === 'in_process') {
	  	res.writeHead(301, {Location: "/in-process"});
	  } else if (status === 'rejected') {
	  	res.writeHead(301, {Location: "/rejected"});
	  } else {

	  }

	  res.end();
	}).catch(function (error) {
	  console.log('ERROR: ', error);
	});
});