import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends Component {
	render() {
		return(
			<CircularProgress className={css(style.loading)} thickness={7} />
		);
	}
}

const style = StyleSheet.create({
	loading: {
		textAlign: 'center',
		position: 'absolute',
		left: '50%',
		margin: '80px',
	}
});

export default Loading;