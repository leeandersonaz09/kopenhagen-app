import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex:1,
    flexDirection:'row',
    marginBottom:10,
    paddingHorizontal:5
  },

  imageContainer: {

  },

  image: {
    width: 80,
    height: 80,
    borderRadius:100, 
  },

  separatorContainer: {
    borderTopWidth: 1,
    resizeMode:'contain',
    borderColor: '#C0C0C0',
    marginTop: 3,
    paddingHorizontal:15
  },
  infoContainer: {
    paddingLeft: 10,
    flex: 1, 
  },
  tittle: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: 13, 
    marginTop:10
  },

  price: {
    textAlign: 'left',
    color: colors.brown2,
    fontSize: 12,
    marginTop: 10, 
  },

  description: {
    textAlign: 'left',
    color: colors.gray,
    fontSize: 12,
    marginTop: 3,
    flex: 1, 
    flexWrap: 'wrap'

  }

});

export default styles;