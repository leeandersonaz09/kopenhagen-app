import { StyleSheet } from 'react-native';
import {metrics, colors, fonts} from '../../styles';

export default StyleSheet.create({
	content:{
		marginTop:32,
		flexDirection:'row',
		alignContent:'space-between',
		flex:1,
		paddingHorizontal:4
	},
	card:{
		flexDirection:'row',
	},
	headerSection:{
		flex:1,
		flexWrap: 'wrap'
	},
	image:{
		width:118,
		height:120,
		borderRadius:20,
		borderWidth:1,
		borderColor:"#D1D1D1"
	},
	titleSection:{
		marginLeft:16,
		alignContent:'space-between',
		flex:1,
	},
	titleName:{
		fontSize: fonts.regular,
		fontWeight:'bold', 
		flexWrap:'wrap',
		paddingBottom:10
	},
	description: {
		fontSize:fonts.header,
		color:colors.brown2,
		fontWeight:'bold'
	},
	actions:{
		alignContent:'space-around',
		flexDirection:'row',
		width:95,
		height:30,
		marginTop:20
	},
	priceSection:{
		paddingLeft:(metrics.screenWidth/2) - 30,
		justifyContent:'space-between',
		alignItems:'center',
		paddingTop:10

	},
	price:{
		textAlign:'right',
		fontSize:fonts.headertitle,
		color: colors.brown2,
	},
	caption:{
		fontSize:22,
		paddingHorizontal:6
	},
	removeCart:{

	},
	btn: {
		width: 48,
		height:48,
		borderRadius:20,
		borderColor:"#fff",
		borderWidth:1,
		backgroundColor:"#ff3d00",
		justifyContent: 'center',
		alignItems: 'center',

	},
	Button:{

	},
	textButton:{ 
		fontSize: 18, 
		color: "white", 
		fontWeight: "bold",
	}
});
