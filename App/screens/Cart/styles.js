import { StyleSheet } from 'react-native';

import { metrics, colors, fonts } from '../../styles';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	container2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: fonts.header,
		color: colors.yellow,
		fontWeight: "bold",
		marginBottom:20
	},
	TabText: {
		color: colors.white,
	  },
	
	  TabIcon: {
		padding: 10,
		color: colors.yellow,
	  },
	textMessage: {
		color: 'red',
		fontSize: 16
	},
	totalContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: 28,
		marginBottom: 100,
	},
	totalSection: {

	},
	totalText: {
		fontSize: 28,
		fontWeight: 'bold',
		fontFamily: fonts.SFP_bold
	},
	subTotalSection: {
		flexDirection: 'row',
		alignContent: 'space-between',
		marginTop: 10,
	},
	textsubTotal: {
		fontSize: 14,
		fontFamily: fonts.SFP_regular
	},
	pricesubTotal: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	divider: {
		height: 1,
		borderColor: '#dddd',
		borderStyle: 'dashed',
		borderWidth: 1,
		alignSelf: 'stretch',
		flex: 1,
		marginHorizontal: 29,
		marginTop: 12
	},
	buttonSection: {
		textAlign: 'center',
		alignItems: 'center',
		marginTop: 29
	},
	Button: {
		width: 200,
		height: 45,
		backgroundColor: '#000',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center",
		borderRadius: 80,
		padding: 5,
	},
	textButton: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	loginButton :{
		width: 180,
		backgroundColor: '#000',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center",
		borderRadius: 5,
		padding: 4
	  }
});
