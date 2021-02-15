import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ProductContainer: {
    flex:1, 
    padding: 10,
  },
  headerTitle: {
    fontSize: fonts.header,
    color: colors.white,
    fontWeight: "bold",
    marginTop: 25
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  separatorContainer: {
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
    marginTop: 3,
    padding: 10
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },

});

export default styles;