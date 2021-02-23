import { StyleSheet, Dimensions } from 'react-native';
import {colors, fonts, metrics} from '../../styles';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerImage: {
    width: "100%",
    height: 300,
  },
  content: {
    backgroundColor:colors.white,
    position: 'relative',
    left: 0, top: -70,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingTop: 50,
  },
  container2: {
		justifyContent: 'center',
		alignItems: 'center',
	},
  textMessage: {
		color: 'red',
		fontSize: 16
	},
  Section:{
    flexDirection:'row',
    paddingHorizontal:24,
  },
  name:{
    fontSize:fonts.header,
    flexWrap:'wrap',
    fontWeight:'bold'
  },
  Photobutton:{
    position: 'relative',
    left: 0, top: -280,
    marginLeft:(metrics.screenWidth/2)+155,
    width: 34,
		height:34,
		borderRadius:20,
		borderColor:"#fff",
		borderWidth:1,
		backgroundColor:"#f86f16",
		justifyContent: 'center',
		alignItems: 'center',
  },
  button:{
    position: 'absolute',
    marginLeft:(metrics.screenWidth/2)+155
  },
  adress:{
    fontSize:fonts.regular,
    flexWrap:'wrap',
    marginLeft:6
  },
  email:{
    fontSize:fonts.regular,
    flexWrap:'wrap',
    marginLeft:6
  },
  phone:{
    fontSize:17,
    flexWrap:'wrap',
    marginLeft:6
  },
  separator:{
    borderColor:'#f5f5f5',
    borderWidth:1,
    marginTop:15,
    marginBottom:15
  },
  iconText:{
    flexDirection:'row',
  },
  logoutButton :{
    width: 150, height:45,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 40,
    padding: 4
  },
  viewWrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.2)", 
}, 
modalView: { 
    alignItems: "center", 
    justifyContent: "center", 
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    elevation: 5, 
    transform: [{ translateX: -(width * 0.4) },  
                { translateY: -90 }], 
    height: 180, 
    width: width * 0.8, 
    backgroundColor: "#fff", 
    borderRadius: 7, 
}, 
textInput: { 
    width: "80%", 
    borderRadius: 5, 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderColor: "rgba(0, 0, 0, 0.2)", 
    borderWidth: 1, 
    marginBottom: 8, 
}, 

});

export default styles;