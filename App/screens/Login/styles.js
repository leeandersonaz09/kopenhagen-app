import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.black
  },
  lottie: {
    width: 300,
    height: 300
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 0
  },

  title: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    color:colors.yellow
  },

  label: {
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.yellow,
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  },

  button: {
    height: 42,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonf: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  buttonf2: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 0.5,
    marginBottom: 10
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonTextf: {
    color: '#f44',
    fontWeight: 'bold',
    fontSize: 12
  },

  Image: {
    width: 200,
    height: 200,

  },
});

export default styles;