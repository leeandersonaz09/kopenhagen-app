import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../../components';
import styles from './styles';
import * as firebase from 'firebase';
//Lottie depence 
import Lottie from 'lottie-react-native';
//Lottie File 
import dataloading from '../../loaders/photo.json';
import FireFunctions from "../../config/FireFunctions";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { showMessage } from 'react-native-flash-message';

const Contact = ({ navigation }) => {

  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);
  // This is to manage Modal State 
  const [isModalVisible, setModalVisible] = useState(false);
  // change Modal State 
  const [modalType, setmodalType] = useState([]);
  // This is to manage TextInput State 
  const [inputValue, setInputValue] = useState("");

  // Create toggleModalVisibility function that will 
  // Open and close modal upon button clicks. 

  function toggleModalVisibility(type) {
    const db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("profile").doc("personal");

    if (type === 'name') {

      db.update({
        name: inputValue
      }).then(async function () {

        const newobj = { ...userData, name: inputValue }
        await AsyncStorage.setItem('user', JSON.stringify(newobj))
        setuserData(newobj);

        showMessage({
          message: `${'Seu nome ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        });
      }).catch(function (error) {
        showMessage({
          message: `${error}. Tente novamente!`,
          type: 'warning',
          backgroundColor: '#d84646',
          duration: 2800
        });
      });
    }

    if (type === 'adress') {
      db.update({
        adress: inputValue
      }).then(async function () {

        const newobj = { ...userData, adress: inputValue }
        await AsyncStorage.setItem('user', JSON.stringify(newobj))
        setuserData(newobj);

        showMessage({
          message: `${'Seu endereço ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        });
      }).catch(function (error) {
        showMessage({
          message: `${error}. Tente novamente!`,
          type: 'warning',
          backgroundColor: '#d84646',
          duration: 2800
        });
      });
    }

    if (type === 'phone') {
      db.update({
        phone: inputValue
      }).then(async function () {

        const newobj = { ...userData, phone: inputValue }
        await AsyncStorage.setItem('user', JSON.stringify(newobj))
        setuserData(newobj);

        showMessage({
          message: `${'Seu telefone ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        });
      }).catch(function (error) {
        showMessage({
          message: `${error}. Tente novamente!`,
          type: 'warning',
          backgroundColor: '#d84646',
          duration: 2800
        });
      });
    }

    if (type === 'email') {

      firebase.auth().currentUser.updateEmail(inputValue).then(async function () {

        await db.update({
          email: inputValue
        })

        const newobj = { ...userData, email: inputValue }
        await AsyncStorage.setItem('user', JSON.stringify(newobj))
        setuserData(newobj);

        showMessage({
          message: `${'Seu email' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        });

      }).catch(function (error) {
        console.log(error)
        let err = error;
        if (error == 'Error: This operation is sensitive and requires recent authentication. Log in again before retrying this request.') {
          err = 'Essa ação requer que você tenha efetuado login recente. Faça logoff e entre novamente para atualizar!'
        }
        showMessage({
          message: `${err}. Tente novamente!`,
          type: 'warning',
          backgroundColor: '#d84646',
          duration: 2800
        });
      });
    }
    setModalVisible(!isModalVisible);
    setInputValue("");
  };

  useEffect(() => {

    const getPhotoPermission = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status != "granted") {
          alert("We need permission to use your camera roll if you'd like to incude a photo.");
        }
      }
    };

    AsyncStorage.getItem('user').then((user) => {

      if (user !== null) {
        // We have data!!
        const data = JSON.parse(user)
        setuserData(data);

      }
    })
      .catch((err) => {
        console.log(err)
      })

  }, [])


  //loading
  if (loading == true) {
    return (
      <View
        style={{

          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#694fad'
        }}>

        <Lottie source={dataloading} style={{ width: 300, height: 300 }} autoPlay loop />
        <Text style={{ color: '#ffff', fontWeight: 'bold', marginTop: 8 }}>
          Aguarde...Estamos carregando tudo para você!
          </Text>
      </View>
    )
  }


  //console.log(userData)

  const updatePhoto = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setLoading(true);
      const getimg = await FireFunctions.shared.uploadUserPhotoAsync(result.uri)
      await firebase.auth().currentUser.updateProfile({
        photoURL: getimg
      }).then(async () => {

        await AsyncStorage.setItem('user', JSON.stringify({ ...userData, img: getimg }))
        setuserData({ ...userData, img: getimg });
        setLoading(false);

      }).catch((err) => {
        alert(err);
      })

    }
  };

  function logOut() {
    try {
      firebase.auth().signOut().then(async () => {
        await AsyncStorage.setItem('user', JSON.stringify({ userState: false }))
        navigation.push('Profile')
      })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(userData.img)
  return (
    <React.Fragment>
      <SafeAreaView style={styles.Container}>
        <Image
          style={styles.headerImage}
          source={{ uri: userData.img ? userData.img : 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png' }}
        />
        <TouchableOpacity style={styles.Photobutton} onPress={() => updatePhoto()}>
          <Icon name="camera-outline" size={25} style={{
            color: '#fff',
            elevation: 1,
          }} />
        </TouchableOpacity>
        <View style={styles.content}>
          {userData.userState || userData.uid ? (
            <>
              <View style={styles.Section}>
                <View>
                  <Text style={styles.name}>{userData.name}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                  setmodalType({
                    title: 'Atualizar Nome',
                    holder: "Digite seu nome...",
                    type: "name"
                  })
                  setModalVisible(!isModalVisible);
                }} style={styles.button}>

                  <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
                </TouchableOpacity>

              </View>

              <View style={styles.separator} />

              <View style={styles.Section}>
                <View style={styles.iconText}>
                  <MaterialIcons
                    name="map"
                    color="#969696"
                    size={24} />
                  <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.adress}>
                    {userData.adress}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => {
                  setmodalType({
                    title: 'Atualizar Endereço',
                    holder: "Digite seu endereço...",
                    type: "adress"
                  })
                  setModalVisible(!isModalVisible);
                }} style={styles.button}>
                  <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
                </TouchableOpacity>

              </View>

              <View style={styles.separator} />


              <View style={styles.Section}>
                <View style={styles.iconText}>
                  <MaterialIcons
                    name="phone"
                    color="#969696"
                    size={24} />
                  <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.phone}>
                    {userData.phone}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => {
                  setmodalType({
                    title: 'Atualizar Telefone',
                    holder: "Digite seu telefone...",
                    type: "phone"
                  })
                  setModalVisible(!isModalVisible);
                }} style={styles.button}>
                  <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
                </TouchableOpacity>

              </View>

              <View style={styles.separator} />

              <View style={styles.Section}>
                <View style={styles.iconText}>
                  <MaterialIcons
                    name="mail"
                    color="#969696"
                    size={24} />
                  <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.email}>
                    {userData.email}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => {
                  setmodalType({
                    title: 'Atualizar Email',
                    holder: "Digite seu email...",
                    type: "email"
                  })
                  setModalVisible(!isModalVisible);
                }} style={styles.button}>
                  <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
                </TouchableOpacity>

              </View>

              <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                <TouchableOpacity
                  onPress={() => logOut()}
                  style={styles.logoutButton}>
                  <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Sair </Text>
                  <View style={{ width: 10 }} />
                  <Icon name="log-out-outline" size={30} style={{ color: '#fff' }} />
                </TouchableOpacity>
              </View></>
          ) : (
              <>
                <View style={styles.container2}>
                  <Text style={styles.textMessage}>Entre na sua conta para fazer pedidos!</Text>
                  <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                    <TouchableOpacity
                      onPress={() => navigation.push('Login')}
                      style={styles.logoutButton}>
                      <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Entrar </Text>
                      <View style={{ width: 10 }} />
                      <Icon name="log-in-outline" size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

        </View>
        <Modal animationType="slide"
          transparent visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>{modalType.title}</Text>
              <TextInput placeholder={modalType.holder}
                value={inputValue} style={styles.textInput}
                onChangeText={(value) => setInputValue(value)} />
              {/** This button is responsible to close the modal */}
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Button title="Atualizar" onPress={() => toggleModalVisibility(modalType.type)} />
                <View style={{ paddingLeft: 20 }} />
                <Button title="Cancelar" onPress={toggleModalVisibility} />
              </View>

            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </React.Fragment>
  )
}
export default Contact;
