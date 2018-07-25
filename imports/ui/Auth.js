import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite';

import { SignUp } from './AccountsWrapper.js';

class SignUpPage extends Component {
	render() {
		return <div className="container">
			<div className="row align-content-center justify-content-center">
				<div className="col-md-4">
					<div className={css(style.signUpContainer)}>
						<SignUp/>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default SignUpPage

const style = StyleSheet.create({
	signUpContainer: {
		border: '1px solid #E7E7E7',
		borderRadius: '8px',
		marginTop: '150px',
		boxShadow: '1px 1px 2px #E7E7E7', 
	}
});