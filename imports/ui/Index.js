import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';

import { withTracker } from 'meteor/react-meteor-data';

import { faFacebook, faInstagram, faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
	render() {
		return (<header className={css(headerStyle.masthead)} id="header">
	      <div className="container-fluid">
	        <div className="row align-items-center">
	          <div className="col-md-4 offset-md-1 col-12">
	            <h1 className={'mb-4 ' + css(headerStyle.headingOne)}>APRENDA A PROGRAMAR EM 30 DIAS</h1>
	            <p className={'mb-4 ' + css(headerStyle.paragraph)}>Se você sempre quis aprender a programar mas não sabe por onde começar, está no lugar certo.</p>

	            <div className="row justify-content-start mb-5">
	              <div className="col-12">
	                <button className={'btn btn-primary btn-block mt-3 form-toggle ' + css(style.btn, style.btnPrimary)} data-target="signup">Inscreva-se</button>
	              </div>
	              <div className="col-12">
	                <a className={'btn btn-block mt-3 js-scroll-trigger ' + css(style.btn, style.btnOutline)} href="#about">Saiba mais</a>
	              </div>
	            </div>
	          </div>
	        
	          <div className="col-md-7 col-12">
	            <img className="img-fluid" src="/img/hero12.jpg"/>
	          </div>
	        </div>
	      </div>
	    </header>);
	}
}

const headerStyle = StyleSheet.create({
	masthead: {
		paddingTop: '4rem',
  		paddingBottom: '4rem',
  		'@media (min-width: 768px)': {
            paddingTop: '9rem',
  			minHeight: '600px',
        },
        '@media (min-width: 992px)': {
            paddingTop: '5rem',
  			minHeight: '550px',
        },
	},
	headingOne: {
		fontSize: '1.8rem',
  		fontWeight: 'bold',
  		'@media (min-width: 768px)': {
            fontSize: '3.5rem',
        },
	},
	paragraph: {
		color: '#666666',
  		fontSize: '1.2rem',
  		'@media (min-width: 768px)': {
            fontSize: '1.5rem',
        },
	},
});

class AboutSection extends Component {
	render() {
		return (
			<section className={'bg-primary ' + css(style.section, style.bgPrimary, aboutStyle.aboutSection)}>
		      <div className="container">
		        <div className="row">
		          <div className="col-lg-8 mx-auto text-center">
		            <h2 className="section-heading text-uppercase mb-5">Em um mês, você aprenderá o essencial</h2>
		            <div className="mb-4">
		              <p>Na Hike, você se juntará a um dos nossos co-fundadores para um mês de aprendizado interativo online. Você aprenderá a usar as ferramentas necessárias para criar aplicativos Web robustos e, no final do curso, terá aprendido desde criar o primeiro botão até a armazenar imagens em um servidor e colocar seu site no ar!</p>
		              
		              <p>Você aprenderá tudo isso usando o Meteor, um <span className="italic">framework</span> muito poderoso e fácil de usar.</p>

		              <p>Com uma dedicação de 2 a 3 horas por semana, em 30 dias você deixará de ser um iniciante e terá aprendido a criar seus próprios Websites!</p>
		            </div>

		            <button className={"btn btn-secondary mt-5 mb-3 form-toggle " + css(style.btn, style.btnSecondary)} data-target="signup">Inscreva-se</button>
		          </div>
		        </div>
		      </div>
		    </section>
		);
	}
}

const aboutStyle = StyleSheet.create({
	aboutSection: {
		webkitClipPath: 'polygon(0 2%,100% 0,100% 100%,0 98%)',
		clipPath: 'polygon(0% 2%, 100% 0,100% 100%,0 98%)',
		fontSize: '1.1rem',
		'@media (min-width: 992px)': {
		    webkitClipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)',
		    clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)',
		}
	},
});

class Partners extends Component {
	render() {
		return (
			<section className={css(style.section)}>
		      <div className="container text-center">
		        <h2 className="section-heading text-uppercase mb-5">Empresas que  <FontAwesomeIcon icon={faHeart} color="#EF4836"/> a Hike</h2>
		        <div className="row justify-content-center align-items-end">
		          <div className="col-md-2 col-6">
		            <img className={"img-fluid " + css(partnersStyle.image)} src="/img/partners/cubo.png"/>
		          </div>
		          <div className="col-md-2 col-6">
		            <img className={"img-fluid " + css(partnersStyle.image)} src="/img/partners/mobly.jpg"/>
		          </div>
		        </div>
		      </div>
		    </section>
		);
	}
}

const partnersStyle = StyleSheet.create({
	image: {
		webkitFilter: 'grayscale(100%)',
  		filter: 'grayscale(100%)',
	}
});

class Features extends Component {
	render() {
		return (
			<section className={css(style.bgSecondary, style.section, featuresStyle.section)}>
		      <div className="container">
		        <div className="row justify-content-center align-items-start text-center">
		          <div className="col-md-3 col-sm-12">
		            <div>
		              <img className={"img-fluid " + css(featuresStyle.icon)} src="/img/icons/iniciantes.png"/>
		            </div>
		            <h5>PARA INICIANTES</h5>
		            <p>A Hike foi feita para quem está começando do zero: não se preocupe se você não sabe o que é uma linha de comando ou um <span className="italic">framework</span>!</p>
		          </div>
		          <div className="col-md-3 col-sm-12">
		            <div>
		              <img className={"img-fluid " + css(featuresStyle.icon)} src="/img/icons/forum.png"/>
		            </div>
		            <h5>FÓRUM DE DÚVIDAS</h5>
		            <p>Alguém da equipe responderá pessoalmente a qualquer dúvida que você tiver, então não se preocupe sobre travar ou não saber o que fazer</p>
		          </div>
		          <div className="col-md-3 col-sm-12">
		            <div>
		              <img className={"img-fluid " + css(featuresStyle.icon)} src="/img/icons/ummes.png"/>
		            </div>
		            <h5>APRENDA EM 30 DIAS</h5>
		            <p>Montamos um curso com o suficiente para que você saia construindo seus próprios projetos em 30 dias. Tudo só com o que realmente importa.</p>
		          </div>
		          <div className="col-md-3 col-sm-12">
		            <div>
		              <img className={"img-fluid " + css(featuresStyle.icon)} src="/img/icons/certificado.png"/>
		            </div>
		            <h5>CERTIFICAÇÃO</h5>
		            <p>Termine o curso em 30 dias e ganhe o Certificado Hiker, que comprova sua habilidade para construir WebApps usando HTML, CSS e JavaScript.</p>
		          </div>
		        </div>
		      </div>
		    </section>
		);
	}
}

const featuresStyle = StyleSheet.create({
	section: {
		webkitClipPath: 'polygon(0 2%,100% 0,100% 100%,0 98%)',
		clipPath: 'polygon(0% 2%, 100% 0,100% 100%,0 98%)',
		fontSize: '1.1rem',
		'@media (min-width: 992px)': {
		    webkitClipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)',
		    clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)',
		},
	},
	icon: {
		maxWidth: '100px',
  		margin: '20px',
	}
});

class Instructor extends Component {
	render() {
		return (
			<section className={css(instructorStyle.section)}>
		      <div className="container">
		        <h2 className="text-uppercase mb-5 text-center">Seu Instrutor</h2>
		        <div className="row mx-auto justify-content-center align-items-center">
		          <div className="col-md-8">
		            <div className="embed-responsive embed-responsive-16by9 mb-5">
		              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/Al15IUHqcEQ?rel=0" allowFullScreen></iframe>
		            </div>
		          </div>
		        
		          <div className="col-md-4">
		            <h6><b>Gustavo Torres</b></h6>
		        
		            <p>Gus cresceu no Capão Redondo, periferia de São Paulo. Estuda Ciências da Computação em Stanford, é bolsista da Fundação Estudar e dá aulas desde seus 13 anos. Trabalhou na Khan Academy, dá monitoria para alunos de Stanford e seu time foi um dos vencedores da Microsoft Imagine Cup.</p>
		            <p><a className={"js-scroll-trigger " + css(instructorStyle.link)} href="#team">Conheça todo o time da Hike >></a></p>
		          </div>
		        </div>
		      </div>
		    </section>
		);
	}
}

const instructorStyle = StyleSheet.create({
	section: {
		padding: '3rem 0',
	},
	link: {
		color: '#f29559',
	},
});

class Testimonials extends Component {
	render() {
		return(
			<section className={"bg-primary " + css(style.bgPrimary, testimonialsStyle.section)}>
		      <div className="container-fluid text-center">
		        <h2 className={"section-heading text-uppercase mb-5"}>514 PESSOAS JÁ PASSARAM PELA HIKE</h2>
		        <div id="testimonialCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
		          <div className="carousel-inner">
		            <div className="carousel-item active">
		              <div className="row justify-content-center">
		                <div className="col-md-7 col-9">
		                  <p>A Hike possibilita que pessoa sem conhecimento prévio de programação, como eu, possa desenvolver um aplicativo web em 30 dias, sem sobrecarregar sua rotina para tanto. O suporte para dúvidas é muito eficiente e o material é bem elaborado e de fácil utilização. Fiquei muito satisfeita com a experiência e recomendo!</p>
		                  <img className={"thumbnail rounded-circle " + css(testimonialsStyle.image)} src="/img/testimonials/tonelli.jpeg"/>
		                  <p>Fernanda Tonelli</p>
		                </div>
		              </div>
		            </div>
		            <div className="carousel-item">
		              <div className="row justify-content-center">
		                <div className="col-md-7 col-9">
		                  <p>Desde o primeiro dia gostei muito da forma da Hike de trabalhar, a equipe deu todo o suporte e disponibilidade necessárias. Consegui colocar em prática os conhecimentos muito rapidamente através de uma abordagem de ensino MUITO prática. Recomendo!!!</p>
		                  <img className={"thumbnail rounded-circle " + css(testimonialsStyle.image)} src="/img/testimonials/arruda.jpeg"/>
		                  <p>Marco Arruda</p>
		                </div>
		              </div>
		            </div>
		            <div className="carousel-item">
		              <div className="row justify-content-center">
		                <div className="col-md-7 col-9">
		                  <p>Agradeço muito a vocês pela dedicação em ensinar e sempre disponíveis para solucionar qualquer dúvida que fosse. Estou ainda mais empolgado com o que aprendi e colocarei em prática em novos projetos. O trabalho de vocês está SENSACIONAL! Parabéns!</p>
		                  <img className={"thumbnail rounded-circle " + css(testimonialsStyle.image)} src="/img/testimonials/pim.jpeg"/>
		                  <p>Guilherme Pim</p>
		                </div>
		              </div>
		            </div>
		            <div className="carousel-item">
		              <div className="row justify-content-center">
		                <div className="col-md-7 col-9">
		                  <p>Gente, que trabalho fantástico, não só do conteúdo, mas também o esforço dos criadores. Vocês modificaram ainda mais a forma de ensinar programação. Eu já tinha feito algumas coisas para web, mas nada igual o que a Hike me ensinou, eu fico muito agradecido, vocês não só me ajudaram só a melhorar minha prática, mas também minha lógica de programação.</p>
		                  <img className={"thumbnail rounded-circle " + css(testimonialsStyle.image)} src="/img/testimonials/mineiro.jpeg"/>
		                  <p>Alexandre Mineiro</p>
		                </div>
		              </div>
		            </div>
		          </div>
		          <a className="carousel-control-prev" href="#testimonialCarousel" role="button" data-slide="prev">
		            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
		            <span className="sr-only">Previous</span>
		          </a>
		          <a className="carousel-control-next" href="#testimonialCarousel" role="button" data-slide="next">
		            <span className="carousel-control-next-icon" aria-hidden="true"></span>
		            <span className="sr-only">Next</span>
		          </a>
		        </div>
		      
		        <button className={"btn btn-secondary mt-5 mb-3 form-toggle " + css(style.btn, style.btnSecondary)} data-target="signup">Inscreva-se</button>
		      </div>
		    </section>
		);
	}
}

const testimonialsStyle = StyleSheet.create({
	section: {
		padding: '2rem',
	},
	image: {
		width: '50px',
	},
	headingTwo: {
		fontWeight: 'bold',
	}
});

class FAQItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		}
	}

	toggle() {
		this.setState({expanded: !this.state.expanded});
	}

	render() {
		return(
			<div className={css(faqStyle.question)}>
              <button onClick={this.toggle.bind(this)} className={css(faqStyle.accordion)}>{this.props.question}
                <svg className={"chevron ml3 fill-silver " + css(faqStyle.expandIcon, (this.state.expanded ? faqStyle.minimizeIcon : ''))} width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0" fill="#000000" fillRule="evenodd"><path d="M29.2617603,20.9995621 C29.1409175,20.9995621 29.018601,20.9662302 28.9051266,20.8962332 L16,12.7865884 L3.09487336,20.8962332 C2.73971342,21.1178902 2.29023716,20.9728966 2.09276235,20.5712475 C1.89528753,20.1695984 2.02349879,19.6612873 2.37865872,19.4379638 L15.6418927,11.1049954 C15.8644203,10.9650015 16.1355797,10.9650015 16.3581073,11.1049954 L29.6213413,19.4379638 C29.9765012,19.6612873 30.1047125,20.1679318 29.9072377,20.5712475 C29.7731316,20.8445688 29.5211302,20.9995621 29.2617603,20.9995621"></path></g></svg>
              </button>
              <div className={css(faqStyle.panel) + (this.state.expanded ? '' : ' d-none ')} dangerouslySetInnerHTML={ {__html: this.props.answer} }/>
            </div>
		);
	}
}

class FAQ extends Component {
	render() {
		const items = [
			{
				question: 'Quanto custa?',
				answer: 'R$ 299 para ter acesso a todo conteúdo do curso por 1 ano. Você pode parcelar esse valor em até 3x sem juros na hora do pagamento.',
			},
			{
				question: 'Tem bolsa?',
				answer: 'Sim! Para participar do nosso processo seletivo de bolsas, preencha o formulário <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdQ9KruDa0HTRVpuFSSKtLKRlMthS5xpTGh_vYSXvvRCRgXig/viewform">desse link</a> e fique atento ao seu e-mail! Para concorrer às bolsas, você deve estar matriculado em alguma instituição de ensino e comprovar insuficiência de renda.',
			},
			{
				question: 'O que eu vou aprender?',
				answer: 'Durante os 30 dias, você aprenderá Web full stack (front-end e back-end). Ou seja, você vai aprender como montar sites do começo ao fim, desde criar um botão até construir a base de dados. Isso acontece ao longo da construção de um projeto, que é uma rede social. Com esse projeto, você vai aprender HTML, CSS, JavaScript e algumas ferramentas muito populares em programação, como Git, Github e Heroku. Faremos isso usando o Meteor, um dos frameworks de JavaScript mais usados no mundo.',
			},
			{
				question: 'Nunca programei na vida ou tenho pouca experiência. Esse curso é pra mim?',
				answer: 'Sim! A Hike foi feita para quem está começando do zero: não se preocupe se você nunca escreveu uma linha de código; em 30 dias você terá aprendido a criar seus próprios Websites.',
			},
			{
				question: 'É tudo online?',
				answer: 'Sim!',
			},
			{
				question: 'Quanto tempo de dedicação?',
				answer: 'Prevemos uma dedicação de 2 a 3 horas por semana para terminar o curso em um mês. Entretanto, você é livre para se dedicar quanto quiser. O curso demanda cerca de ~12h, ou seja, se você for uma pessoa super motivada, pode até terminar tudo em um só dia!',
			},
			{
				question: 'Vocês oferecem suporte para dúvidas?',
				answer: 'Sim! Nossa plataforma inclui opção para você postar dúvidas, que serão tiradas por alguém do nosso time.',
			},
			{
				question: 'A Hike dá certificado?',
				answer: 'Sim, contanto que você termine o curso em até 30 dias :)',
			},

		];

		// TODO: allow expand
		const pageItems = items.map((item, index) => {
			return (
				<FAQItem key={index} question={item.question} answer={item.answer}/>
			);
		});

		return(
			<section className={css(style.section, faqStyle.section)}>
		    	<div className="container mb-5">
			        <div className="row">
			          <div className="col-12 mb-4 text-center">
			            <h3 className="mt-5"><b>PERGUNTAS FREQUENTES</b></h3>
			          </div>
			        </div>

			        <div className="row justify-content-center mb-3">
			          <div className="col-lg-10">
			          	{pageItems}
			          </div>
			        </div>
		     	</div>
		    </section>
		);
	}
}

const faqStyle = StyleSheet.create({
	section: {
		backgroundColor: '#EEEEEE',
	},
	question: {
		borderBottom: '1px solid #bbbbbb',
	},
	accordion: {
		backgroundColor: '#eee',
		color: 'black',
		fontWeight: 'bold',
		cursor: 'pointer',
		padding: '18px',
		width: '100%',
		textAlign: 'left',
		border: 'none',
		outline: 'none',
		transition: '0.4s',
		fontSize: '14pt',
		':focus': {
			outline: 'none',
		},
		':hover': {
			color: '#3498db',
			cursor: 'pointer',
		}
	},
	expandIcon: {
		webkitTransform: 'rotate(180deg)',
		msTransform: 'rotate(180deg)',
		oTransform: 'rotate(180deg)',
		transform: 'rotate(180deg)',
		float: 'right',
		webkitTransition: 'all 0.4s ease',
		oTransition: 'all 0.4s ease',
		transition: 'all 0.4s ease',
	},
	panel: {
		color: '#333',
		padding: '0 18px',
		marginBottom: '15px',
		overflow: 'hidden',
	},
	minimizeIcon: {
		webkitTransform: 'rotate(360deg)',
		msTransform: 'rotate(360deg)',
		oTransform: 'rotate(360deg)',
		transform: 'rotate(360deg)',
	},
});

class InterestModal extends Component {
	submitInterest(event) {
		event.preventDefault();
		const form = $(event.target);

		const t = this;
		$.ajax({
	        type: "GET",
	        url: form.attr('action'),
	        data: form.serialize(),
	        cache: false,
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",

	        error: function(error){},

	        success: function(data){
	            if (data.result === "success") {
	            	console.log('SUCCESS');
	                t.refs.mcResponse.innerHTML = 'Boa, você agora vai receber todas nossas novidades :)';
	            } else {
	                var message = data.msg || "Desculpe, algo deu errado. Tente novamente mais tarde.";

	                if (data.msg) {
	                  if (data.msg.indexOf("already subscribed") >= 0) {
	                    message = "Você já se inscreveu. Obrigado! :)";
	                  } else if (data.msg.indexOf("Please enter a value") >= 0) {
	                    message = "Por favor, insira seu email.";
	                  } else if (data.msg.indexOf("too many") >= 0) {
	                    message = "Tivemos muitas inscrições vindo desse e-mail.";
	                  }
	                }

	                t.refs.mcResponse.innerHTML = message;
	            }
	        }
	    });
	}

	render() {
		const courseIdToUrl = {
   			'dataScience': 'https://hikeacademy.us17.list-manage.com/subscribe/post-json?u=5bfcd8d110b98b14d9ca89ce3&amp;id=328b96fc6a&c=?',
		    'vba': 'https://hikeacademy.us17.list-manage.com/subscribe/post-json?u=5bfcd8d110b98b14d9ca89ce3&amp;id=6762c50ac9&c=?',
		    'mobile': 'https://hikeacademy.us17.list-manage.com/subscribe/post-json?u=5bfcd8d110b98b14d9ca89ce3&amp;id=a29147bc07&c=?',
		    'excel': 'https://hikeacademy.us17.list-manage.com/subscribe/post-json?u=5bfcd8d110b98b14d9ca89ce3&amp;id=2eee51aa50&c=?',
		};

		return(
			<div className="modal fade" id="interestModal" tabIndex="-1" role="dialog" aria-labelledby="signupModalTitle" aria-hidden="true">
		      <div className="modal-dialog modal-dialog-centered" role="document">
		        <div className="modal-content">
		          <div className="modal-header">
		            <h5 className="modal-title" id="signupModalLongTitle">Quero ser Hiker</h5>
		            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span>
		            </button>
		          </div>
		          <div className="modal-body">
		            <form onSubmit={this.submitInterest.bind(this)} action={courseIdToUrl[this.props.interest]} method="post" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
		              <div className="mc_embed_signup_scroll">
		                <p className="text-muted">Deixe seu e-mail para que te enviemos novidades quando lançarmos esse curso. Pode ser até que você ganhe uns descontos também :)</p>
						<div className="form-group">
		                    <input type="email" name="EMAIL" className="email form-control" id="mce-EMAIL" placeholder="Email" required/>
		                </div>
		                <div id="mce-responses" className="clear">
		                  <div className={"response " + css(contactStyle.mcNoShow)} id="mce-error-response"></div>
		                  <div className={"response " + css(contactStyle.mcNoShow)} id="mce-success-response"></div>
		                </div>
		                <div className={css(contactStyle.mcNoShow)} aria-hidden="true"><input type="text" name="b_5bfcd8d110b98b14d9ca89ce3_e9773b005f" tabIndex="-1" value=""/></div>
		                <div className="text-center"><input type="submit" value="Enviar" name="subscribe" id="mc-embedded-subscribe" className="btn btn-secondary btn-block"/></div>
		              </div>
		            </form>
		            <div className="mt-2" ref="mcResponse"></div>
		          </div>
		        </div>
		      </div>
		    </div>
		);
	}
}

class NextCourses extends Component {
	render() {
		const courses = [
			{
				id: 'dataScience',
				title: 'Data Science',
				description: 'Aprenda a extrair insights a partir de dados. Você vai construir  algoritmos como os que o Netflix usa para recomendar filmes.',
			},
			{
				id: 'vba',
				title: 'VBA',
				description: 'Aprenda a automatizar diversos processos em suas planilhas! Com VBA, você leva o trabalho em Excel para outro nível.',
			},
			{
				id: 'mobile',
				title: 'Aplicativos Mobile',
				description: 'Aprenda a construir aplicativos de celular, que permitem que você leve suas ideias para as mãos de várias pessoas.',
			},
			{
				id: 'excel',
				title: 'Excel',
				description: 'Aprenda desde o básico até vários macetes para dominar essa ferramenta que permite que times sejam mais eficientes e organizados.',
			},
		];

		// TODO: change data target
		const items = courses.map((course, index) => {
			return (<div key={index} className="card">
              <div className="card-body">
                <h5 className={"card-title " + css(coursesStyle.cardTitle)}>{course.title}</h5>
                <code>[em breve]</code>
                <p className="card-text mt-3">{course.description}</p>
                <button
                	onClick={() => this.props.changeInterest(course.id)}
                	className={"btn btn-primary form-toggle " + css(style.btn, style.btnPrimary)}
                	data-toggle="modal"
                	data-target="#interestModal">
                	Tenho interesse
                </button>
              </div>
            </div>);
		});

		return (<section className={css(style.section)}>
		      <div className="container text-center">
		        <h2 className="section-heading text-uppercase">Em Breve</h2>
		        <p className="text-muted">Tem interesse em outros assuntos? Clique nos cursos que te interessam para receber nossas novidades!</p>

		        <div className="row">
		          <div className="card-deck">
		          	{items}
		          </div>
		         </div>
		       </div>
	      </section>
		);
	}
}

const coursesStyle = StyleSheet.create({
	cardTitle: {
		margin: 0,
	}
});

class Team extends Component {
	render() {
		const members = [
			{
				name: 'Gus',
				picture: '/img/team/gus.jpg',
				role: 'Criação de Conteúdo',
				description: 'Gus estuda Ciências da Computação em Stanford, é Líder da Fundação Estudar e já trabalhou na Khan Academy. Embora tenha nascido e crescido no Capão Redondo, nunca viu o Mano Brown.',
				linkedin: 'https://www.linkedin.com/in/gustavotorresgts/', 
			},
			{
				name: 'Jão',
				picture: '/img/team/jao.jpg',
				role: 'Experiência do Usuário',
				description: 'Estuda arquitetura no Mackenzie, é fellow do ProLíder e embaixador da Brazil Conference. Se a Hike não der certo, ele não sabe direito o que vai fazer da vida (mas, afinal de contas, quem é que sabe?)',
				linkedin: 'https://www.linkedin.com/in/joaoaraujoc/', 
			},
			{
				name: 'Tutu',
				picture: '/img/team/tutu.jpg',
				role: 'Growth',
				description: 'Cresceu no interior de Minas e passou em 7 universidades dos EUA. Hoje estuda Ciências da Computação em Harvard, mas nós achamos que a maior conquista dele na verdade foi ter ido no Faustão.',
				linkedin: 'https://www.linkedin.com/in/abrantesarthur/', 
			},
		];

		const items = members.map((member, index) => {
			return (<div key={index} className="col-md-4 team-member">
              <img className={"mx-auto rounded-circle " + css(teamStyle.image)} src={member.picture} alt=""/>
              <h4 className={css(teamStyle.subtitle)}>{member.name}</h4>
              <p className={"text-muted " + css(teamStyle.description)}>{member.role}</p>
              <a href={member.linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedinIn}/></a>
              <p className={css(teamStyle.description)}>{member.description}</p>
          </div>);
		});

		return (
			<section className={"bg-light " + css(style.section)} id="team">
		      <div className="container">
		        <div className="row">
		          <div className="col-lg-12">
		            <h2 className="text-uppercase mb-4 text-center">Nóis</h2>
		          </div>
		        </div>

				<div className="row justify-content-center text-center">
					{items}
				</div>
		       </div>
		    </section>
		);
	}
}

const teamStyle = StyleSheet.create({
	section: {
		padding: '2rem',
	},
	image: {
		width: '120px',
		height: '120px',
	},
	subtitle: {
		marginTop: '25px',
		marginBottom: '0',
		textTransform: 'none',
	},
	description: {
		marginTop: '0',
  		marginBottom: '0',
	},
});

class Contact extends Component {
	submitMCInfo(event) {
		event.preventDefault();

		const form = $(event.target);
		const t = this;
		$.ajax({
	        type: "GET",
	        url: form.attr('action'),
	        data: form.serialize(),
	        cache: false,
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",

	        error: function(error){},

	        success: function(data){
	            if (data.result === "success") {
	            	console.log('SUCCESS');
	                t.refs.mcResponse.innerHTML = 'Boa, você agora vai receber todas nossas novidades :)';
	            } else {
	                var message = data.msg || "Desculpe, algo deu errado. Tente novamente mais tarde.";

	                if (data.msg) {
	                  if (data.msg.indexOf("already subscribed") >= 0) {
	                    message = "Você já se inscreveu. Obrigado! :)";
	                  } else if (data.msg.indexOf("Please enter a value") >= 0) {
	                    message = "Por favor, insira seu email.";
	                  } else if (data.msg.indexOf("too many") >= 0) {
	                    message = "Tivemos muitas inscrições vindo desse e-mail.";
	                  }
	                }

	                t.refs.mcResponse.innerHTML = message;
	            }
	        }
	    });
	}

	render() {
		return(
			<section className={"text-white " + css(style.section, style.bgDark)} id="contact">
		      <div className="container text-center">
		        <div className="row mb-4">
		          <div className="col-lg-8 mx-auto text-center justify-content-center">
		              <h6 className="mb-4">Quero receber as 9dades da Hike! 😍</h6>
		              
		              <div className="mc-embed-signup">
		                <form onSubmit={this.submitMCInfo.bind(this)} action="https://hikeacademy.us17.list-manage.com/subscribe/post-json?u=5bfcd8d110b98b14d9ca89ce3&amp;id=4b9173e0e1&c=?" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
		                  <div className={"mc-body " + css(contactStyle.form)}>
		                    <input type="email" name="EMAIL" className={css(contactStyle.field, contactStyle.emailField)} placeholder="E-mail"/>
		                    
		                    <div className={css(contactStyle.mcNoShow)} aria-hidden="true"><input type="text" name="b_5bfcd8d110b98b14d9ca89ce3_4b9173e0e1" tabIndex="-1" value=""/></div>
		                    <input className={css(contactStyle.field, contactStyle.submitField)} type="submit" value="ENVIAR" name="subscribe"/>
		                  </div>
		                  <div className="clear mt-3">
		                    <div ref="mcResponse"></div>
		                  </div>
		                </form>
		              </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-lg-3 ml-auto text-center">
		            <FontAwesomeIcon className={css(contactStyle.icon)} icon={faWhatsapp}/>
		            <div>
		              <a className={css(contactStyle.link)} href="https://api.whatsapp.com/send?phone=5511983407220&text=Oi%2C%20Hike%21" target="_blank">+55 11 98340-7220</a>
		            </div>
		          </div>
		          <div className="col-lg-3 mr-auto text-center">
		            <FontAwesomeIcon className={css(contactStyle.icon)} icon={faEnvelope}/>
		            <div>
		              <a className={css(contactStyle.link)} href="mailto:time@hikeacademy.com.br" target="_blank">time@hikeacademy.com.br</a>
		            </div>
		          </div>
		        </div>
		      </div>
		    </section>
		);
	}
}

const contactStyle = StyleSheet.create({
	form: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		borderRadius: '1.5rem',
		padding: '0',
		margin: '0 auto',
		justifyContent: 'space-between',
		width: '100%',
		maxWidth: '500px',
	},
	mcNoShow: {
		position: 'absolute',
		left: '-5000px',
	},
	field: {
		background: 'none',
		border: '0',
		outline: 'none',
		margin: '0',
		padding: '10px',
		':focus': {
			outline: 'none',
		},
		':-webkit-autofill': {
		    webkitBoxShadow: '0 0 0 30px white inset',
		    borderRadius: '2rem',
		},
	},
	emailField: {
		textIndent: '20px',
  		flexGrow: '1',
	},
	submitField: {
		borderRadius: '0 1.5rem 1.5rem 0',
		backgroundColor: '#3498db',
		color: 'white',
		border: 'none',
		paddingRight: '20px',
		paddingLeft: '20px',
		':hover': {
			cursor: 'pointer',
		},
	},
	icon: {
		fontSize: '32pt',
		marginBottom: '10px',
	},
	link: {
		color: '#3498db',
		webkitTransition: 'all 0.1s',
		mozTransition: 'all 0.1s',
		transition: 'all 0.1s',
		':hover': {
			color: '#55BBFF',
		  	textDecoration: 'none',
		},
	},
});

class Footer extends Component {
	render() {
		return (<div className={css(style.bgDark, footerStyle.footer)}>
	        <div className="container">
	          <div className={css(footerStyle.divider)}></div>	
	          <p>© 2018 Hike Academy</p>
	          <div className={css(footerStyle.social)}>
	            <a href="https://www.facebook.com/HikeAcademyBrasil" target="_blank"><FontAwesomeIcon className={css(footerStyle.socialIcon)} icon={faFacebook}/></a>
	            <a href="https://www.instagram.com/hikeacademy/" target="_blank"><FontAwesomeIcon className={css(footerStyle.socialIcon)} icon={faInstagram}/></a>
	          </div>
	        </div>
	    </div>
	   );
	}
}

const footerStyle = StyleSheet.create({
	footer: {
		width: '100%', 
	    color: 'white', 
	    textAlign: 'center', 
	    fontSize: '12px', 
	},
	social: {
		paddingBottom: '20px',
	},
	socialIcon: {
		color: 'white',
		fontSize: '20px',
		margin: '0 5px',
	},
	divider: {
		borderBottom: '1px solid white',
		marginBottom: '10px',
		borderWidth: 'thin',
	}
});

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interest: '',
		}
	}

	changeInterest(newInterest) {
		this.setState({interest: newInterest});
	}

    render() {
        return (
            <div className={css(style.indexContainer)}>
             	<Header/>
             	<AboutSection/>
             	<Partners/>
             	<Features/>
             	<Instructor/>
             	<Testimonials/>
             	<FAQ/>
             	<InterestModal interest={this.state.interest}/>
             	<NextCourses changeInterest={this.changeInterest.bind(this)}/>
             	<Team/>
             	<Contact/>
             	<Footer/>
            </div>
        );
    }
}

export default withTracker((props) => {
	return {

	};
})(Index);

const style = StyleSheet.create({
	indexContainer: {
		fontFamily: 'Varela Round, sans-serif',
	},

	btn: {
		fontWeight: '700',
		textTransform: 'uppercase',
		border: 'none',
		fontSize: '15pt',
	},
	
	btnPrimary: {
	  backgroundColor: '#3498db',
	  borderColor: '#373737',
	  ':hover': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	  ':focus': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	  ':active': {
	  	color: '#fff',
	  	backgroundColor: '#373737',
	  },
	},

	btnSecondary: {
	  backgroundColor: '#373737',
	  color: 'white',
	},

	btnOutline: {
		backgroundColor: 'white',
		color: '#373737',
		border: 'solid 1px #373737',
		':hover': {
		 	color: '#373737',
		 	border: 'solid 1px #373737',
		},
	},

	section: {
		padding: '5rem 0',
	},

	bgPrimary: {
	  backgroundColor: '#3498db',
	  color: 'white',
	},

	bgSecondary: {
	  backgroundColor: '#f29559',
	},

	bgDark: {
	  backgroundColor: '#212529',
	},
});