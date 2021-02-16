import { StyleSheet } from 'react-native';
import {metrics, colors, fonts} from '../../styles';

export default StyleSheet.create({
	content:{
		marginTop:32,
		flexDirection:'row',
		alignContent:'space-between',
		flex:1,
		paddingHorizontal:15
	},
	card:{
		flexDirection:'row',
	},
	image:{
		width:124,
		height:121,
		borderRadius:20,
		borderWidth:1,
		borderColor:"#000"
	},
	titleSection:{
		marginLeft:16,
		alignContent:'space-between',
	},
	titleName:{
		fontSize: fonts.headerTittle,
		fontWeight:'bold'
	},
	description: {
		fontSize:fonts.regular,
		color:colors.brown,
	},
	actions:{
		alignContent:'space-around',
		flexDirection:'row',
		width:95,
		height:30,
		marginTop:40
	},
	priceSection:{
		paddingLeft:(metrics.screenWidth/2) - 135,
		justifyContent:'space-between'

	},
	price:{
		textAlign:'right',
		fontSize:fonts.headerTittle,
		color: colors.brown2,
	},
	caption:{
		fontSize:22,
		paddingHorizontal:6
	},
	removeCart:{

	},
	btn: {
		width: 53,
		height:53,
		borderRadius:20,
		borderColor:"#fff",
		borderWidth:1,
		backgroundColor:"#ff3d00",
		justifyContent: 'center',
		alignItems: 'center',

	}
});
