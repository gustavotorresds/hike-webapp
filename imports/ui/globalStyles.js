import { StyleSheet, css } from 'aphrodite';

const globalStyles = StyleSheet.create({
	list: {
		listStyle: 'none',
		padding: '0',
		color: 'black',
	},
	listItem: {
		margin: '5px',
	},
	listLink: {
		color: 'black',
		backgroundColor: '#E7E7E7',
		display: 'block',
		padding: '12px',
		':hover': {
			textDecoration: 'none',
			backgroundColor: '#DEDEDE',
		}
	}
});

export default globalStyles;