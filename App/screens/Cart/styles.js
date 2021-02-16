import { StyleSheet } from 'react-native';

import {metrics, colors, fonts }from '../../styles';

export default StyleSheet.create({
	container: { 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		backgroundColor: '#f1f1f1' 
	},
	textMessage: { 
		color: 'red', 
		fontSize: 16 
	},
	totalContainer:{
		flex:1,
		backgroundColor:colors.white,
		paddingHorizontal:29,
	},
	totalSection:{
		marginTop:20
	},
	totalText:{
		fontSize: 28,
		fontWeight:'bold'
	},
	subTotal:{
		flexDirection:'row',
		paddingHorizontal:20
	
	},
	textsubTotal:{
		fontSize:20
	},
	pricesubTotal:{
		fontSize:20
	}
});
