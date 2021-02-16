import { StyleSheet} from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:'100%',
    height:310,
    borderRadius:10
  },
  name:{
    fontSize:21,
    color: colors.brown,
    fontWeight:'bold',
    textAlign: 'center'
  },
  price:{
    marginTop:10,
    fontSize:20,
    color:colors.green,
    fontWeight:'bold',
    textAlign: 'center'
  },
  description:{
    textAlign:'justify',
    marginTop:10,
    color:"#696969",
  },
  optional:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3,
  },
  btnSize: {
    height:40,
    width:110,
    borderRadius:10,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColors:{ 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:5, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:10
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  addToCarContainer:{
    marginHorizontal:30
  },
  addCartButton :{
    width: 180,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
    padding: 4
  }
});    

export default styles;