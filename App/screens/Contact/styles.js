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
    left: 0, top: -50,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingTop: 50,
  }

});

export default styles;