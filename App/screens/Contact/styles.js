import { StyleSheet} from 'react-native';
import { colors, fonts, metrics } from '../../styles';

const styles = StyleSheet.create({
  Container: {
    flex:1
  },
  
  headerTitle: {
    fontSize: fonts.header,
    color: colors.white,
    fontWeight: "bold",
  },

  HeaderBackGround: {
    height: 70,
    width:metrics.screenWidth,
    backgroundColor:colors.black
  },

  svgCurve: {
    position: 'absolute',
    width: metrics.screenWidth
  },

  Content: {
    marginHorizontal: 10,
    marginTop: -50,

  },

  CardContent: {
    flexDirection: 'row',
    
  },

  TextContent: {
    marginLeft: 12,
    flex:1
  },

  tittle: {
    fontWeight: 'bold',
    fontFamily: 'SFProDisplay_bold',
    fontSize: fonts.header,
  },

  text: {
    fontFamily: 'SFProDisplay_regular',
    textAlign:'justify' 
  },

  Icon: {
    fontSize: 50,
    color: colors.blue
  }
  
});

export default styles;