import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, fonts, metrics } from '../../styles';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerImage: {
    width: "100%",
    height: 300,
  },
  content: {
    backgroundColor: colors.white,
    position: 'relative',
    left: 0, top: -70,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowRadius: 3,
    paddingTop: 50,
    flex: 1
  },
  Photobutton: {
    position: 'relative',
    left: 0, top: Platform.OS === 'ios' ? -250 : -265,
    marginLeft: Platform.OS === 'ios' ? (metrics.screenWidth / 2) + 135 : (metrics.screenWidth / 2) + 155,
    width: 38,
    height: 38,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessage: {
    color: 'red',
    fontSize: 16
  },
  Section: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  iconText: {
    flexDirection: 'row',
  },
  sectionAdress:{
    marginRight: 60
  },
  name: {
    fontSize: fonts.header,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  adress: {
    fontSize: fonts.regular,
    marginLeft: 8,
    flexWrap: 'wrap',
  },
  email: {
    fontSize: fonts.regular,
    flexWrap: 'wrap',
    marginLeft: 8
  },
  phone: {
    fontSize: 17,
    flexWrap: 'wrap',
    marginLeft: 8
  },
  separator: {
    borderColor: '#f5f5f5',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  button: {

  },
  arrow: {
    position: 'absolute',
    marginLeft: Platform.OS === 'ios' ? (metrics.screenWidth / 2) + 140 :(metrics.screenWidth / 2) + 178 ,
  },
  logoutButton: {
    width: 150, height: 45,
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