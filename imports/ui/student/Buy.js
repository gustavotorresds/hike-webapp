import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { StyleSheet, css } from 'aphrodite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLock } from '@fortawesome/free-solid-svg-icons';

class Buy extends Component {
	constructor(props) {
		super(props);
		if(this.props.isEnrolled) {
			FlowRouter.go('/courses/' + props.courseId);
		}
		console.log('KEY: ', Meteor.settings.public.MPPublic);
	}

	componentDidMount() {
		const script = document.createElement("script");
		script.src="https://www.mercadopago.com.br/integrations/v1/web-tokenize-checkout.js";
		script.dataset.publicKey=Meteor.settings.public.MPPublic;
		script.dataset.transactionAmount="5";
		script.dataset.buttonLabel="Comprar";
		let form = document.getElementById('MPForm');
		form.appendChild(script);
	}

	render() {
		return (<div className="container">
			<div className="row align-items-center">
				<div className="col-md-6">
					<div className="jumbotron mt-5">
					  <h1 className="display-4">Oi, <span className={css(style.crossed)}>quase</span> Hiker!</h1>
					  <p className="lead">Você está prestes a entrar em uma jornada sem volta.<br/>Antes disso, queríamos te lembrar dos benefícios que vai ter ao se juntar à Hike:</p>
					  <hr className="my-4"/>
					  <ul className={css(style.benefits)}>
					  	<li>Acesso a um Curso de Desenvolvimento Web, que vai te ajudar a sair do zero e a aprender websites robustos</li>
					  	<li>Habilidades que valem para a vida toda</li>
					  	<li>Um ano de acesso completo ao nosso curso e às suas atualizações</li>
					  	<li>Conteúdo trazido direto das melhores universidades do mundo</li>
					  </ul>
					  
					  <form id="MPForm" action={"/pay/" + Meteor.userId()} method="POST"></form>
					</div>
				</div>
				<div className="col-md-6 text-center">
					<div className={"jumbotron mt-5 " + css(style.tryContainer)}>
					  <a className="btn btn-secondary" href="/courses">Experimente</a>
					</div>
				</div>
			</div>
		</div>);
	}
}

export default withTracker((props) => {
	return {
		isEnrolled: Roles.userIsInRole(Meteor.userId(), ['student'], props.courseId),
	};
})(Buy);

const style = StyleSheet.create({
	crossed: {
		textDecoration: 'line-through',
		color: '#666',
	},
	benefits: {
		listStyle: 'disc',
	},
	tryContainer: {
		// height: '100%',
	}
});