import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../styles';

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
    marginLeft:(metrics.screenWidth/2)+155
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
  }

});

export default styles;