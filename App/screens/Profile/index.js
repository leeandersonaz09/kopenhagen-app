import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Platform,
  Picker
} from 'react-native';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../../components';
import styles from './styles';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
//Lottie File 
import dataloading from '../../loaders/photo.json';
import FireFunctions from "../../config/FireFunctions";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { showMessage } from 'react-native-flash-message';
import colors from '../../styles/colors';

import { useFirebase } from '../../config/firebase'

const Profile = ({ navigation }) => {
  const { authUser, logout, getDocument, saveDocument } = useFirebase();
  const [bairro, setbairro] = useState("barra");
  const [city, setcity] = useState('salvador');
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setmodalType] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [keyboardType, setkeyboardType] = useState('');
  const [objData, setobjData] = useState({});

  const handleGet = () => {

    getDocument(
      authUser.uid,
      (result) => setuserData(result.data(),

        setobjData({
          city: result.data().cidade,
          bairro: result.data().bairro,
          Adress: result.data().adress
        }),



      ),
    )
    AsyncStorage.setItem('UserAdress', JSON.stringify(objData))
  }

  AsyncStorage.setItem('UserAdress', JSON.stringify(objData))

  const ErroAlert = (err) => {
    showMessage({
      message: `${err}. Tente novamente!`,
      type: 'warning',
      backgroundColor: '#d84646',
      duration: 2800
    });
  }

  function toggleModalVisibility(type) {
    setModalVisible(true);

    if (type === 'name') {
      try {
        saveDocument(
          authUser.uid,
          { name: inputValue }
        );
        showMessage({
          message: `${'Seu nome ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        })

      } catch (error) {
        ErroAlert(error)
      }

    }

    if (type === 'adress') {

      keyboardType = 'default'

      try {
        saveDocument(
          authUser.uid,
          { adress: inputValue }
        );
        showMessage({
          message: `${'Seu Endereço ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        })

      } catch (error) {
        ErroAlert(error)
      }

    }

    if (type === 'phone') {

      try {
        saveDocument(
          authUser.uid,
          { phone: inputValue }
        );
        showMessage({
          message: `${'Seu novo número ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        })

      } catch (error) {
        ErroAlert(error)
      }

    }

    if (type === 'email') {

      setkeyboardType('email-address')

      authUser.updateEmail(inputValue).then(async function () {
        saveDocument(
          authUser.uid,
          { email: inputValue }
        );
        showMessage({
          message: `${'Seu email ' + inputValue} foi alterado com sucesso`,
          type: "success",
          duration: 2800
        })
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
    setModalVisible(false);
    setInputValue("");
  };

  useEffect(() => {

    const getPhotoPermission = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (status != "granted") {
          alert("We need permission to use your camera roll if you'd like to incude a photo.");
        }
      }
    };
    if (authUser) {
      handleGet()
    }

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

  const updatePhoto = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setLoading(true);
      const getimg = await FireFunctions.shared.uploadUserPhotoAsync(result.uri)

      try {
        saveDocument(
          authUser.uid,
          { img: getimg }
        );
        showMessage({
          message: `Sua foto foi alterado com sucesso`,
          type: "success",
          duration: 2800
        })
        setLoading(false);
      } catch (error) {
        ErroAlert(error)
      }
    }
  };

  const renderIfuser = () => {

    return (
      <>
        <View style={styles.content}>
          <View style={styles.Section}>
            <View>
              <Text style={styles.name}>{userData.name}</Text>
            </View>
            <View style={styles.arrow}>
              <TouchableOpacity onPress={() => {
                setmodalType({
                  title: 'Atualizar Nome',
                  holder: "Digite seu nome...",
                  type: "name",
                  keyboardType: "default",
                  maxLength: 100,
                })
                setModalVisible(!isModalVisible);
              }} style={styles.button}>

                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.separator} />

          <View style={styles.Section}>

            <View style={styles.sectionAdress}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons
                  name="map"
                  color={colors.red}
                  size={24} />
                <Text
                  nnumberOfLines={1}
                  style={styles.adress}>
                  {userData.adress}
                </Text>
              </View>

            </View>

            <View style={styles.arrow}>
              <TouchableOpacity onPress={() => {
                setmodalType({
                  title: 'Atualizar Endereço',
                  holder: "Digite seu endereço...",
                  type: "adress",
                  keyboardType: "default",
                  maxLength: 100,
                })
                setModalVisible(!isModalVisible);
              }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.separator} />


          <View style={styles.Section}>
            <View style={styles.iconText}>
              <MaterialIcons
                name="phone"
                color={colors.red}
                size={24} />
              <Text
                nnumberOfLines={1}
                ellipsizeMode='tail'
                style={styles.phone}>
                {userData.phone}
              </Text>
            </View>
            <View style={styles.arrow}>
              <TouchableOpacity onPress={() => {
                setmodalType({
                  title: 'Atualizar Telefone',
                  holder: "Digite seu número...",
                  type: "phone",
                  keyboardType: Platform.OS === 'ios' ? 'name-phone-pad' : 'phone-pad',
                  maxLength: 11,
                })
                setModalVisible(!isModalVisible);
              }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.Section}>
            <View style={styles.iconText}>
              <MaterialIcons
                name="mail"
                color={colors.red}
                size={24} />
              <Text
                nnumberOfLines={1}
                ellipsizeMode='tail'
                style={styles.email}>
                {userData.email}
              </Text>
            </View>
            <View style={styles.arrow}>
              <TouchableOpacity onPress={() => {
                setmodalType({
                  title: 'Atualizar Email',
                  holder: "Digite seu email...",
                  type: "email",
                  keyboardType: 'email-address',
                  maxLength: 40

                })
                setModalVisible(!isModalVisible);
              }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
            <TouchableOpacity
              onPress={logout}
              style={styles.logoutButton}>
              <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Sair </Text>
              <View style={{ width: 10 }} />
              <Icon name="log-out-outline" size={30} style={{ color: '#fff' }} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  return (
    <React.Fragment>
      <Image
        style={styles.headerImage}
        source={authUser ? { uri: userData.img } : require('../../assets/blank_profile.png')}
      />
      {authUser ? (
        <TouchableOpacity style={styles.Photobutton} onPress={() => updatePhoto()}>
          <Icon name="camera-outline" size={25} style={{
            color: '#fff',
            elevation: 1,
          }} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.Container}>
        {authUser ? (renderIfuser()) : (
          <>
            <View style={styles.content}>
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
            </View>
          </>
        )}

        <Modal animationType="slide"
          transparent visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}>
          {modalType.type == 'adress' ? (
            <View style={{flex:1}}>
              <View style={styles.modalViewAdress}>
                <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>{modalType.title}</Text>

                <View style={{ flexDirection: 'row', paddingVertical:10, alignContent:'center', alignItems:'center', justifyContent:'space-between' }}>
                <View style={{borderWidth:1, borderColor:colors.gray, borderRadius:40}}>
                  <Picker
                    selectedValue={bairro}
                    style={styles.onePicker}
                    itemStyle={styles.onePickerItem}
                    onValueChange={(itemValue, itemIndex) => setbairro(itemValue)}
                  >
                    <Picker.Item label="Barra" value="Barra" />
                    <Picker.Item label="Bairro da Paz" value="Bairro da Paz" />
                    <Picker.Item label="Boca do Rio" value="Boca do Rio" />
                    <Picker.Item label="Campo Grande" value="Campo Grande" />
                    <Picker.Item label="Centro" value="Centro" />
                    <Picker.Item label="Comércio" value="Comércio" />
                    <Picker.Item label="Itapuã" value="Itapuã" />
                    <Picker.Item label="Mussurunga" value="Mussurunga" />
                    <Picker.Item label="Piatã" value="Piatã" />
                    <Picker.Item label="Pituba" value="Pituba" />
                    <Picker.Item label="Rio Vermelho" value="Rio Vermelho" />
                    <Picker.Item label="Sussuarana" value="Sussuarana" />
                    <Picker.Item label="Ondina" value="Ondina" />
                  </Picker>
                </View>
                <View style={{borderWidth:1, borderColor:colors.gray, borderRadius:40}}>
                  <Picker
                    selectedValue={city}
                    style={styles.onePicker}
                    itemStyle={styles.onePickerItem}
                    onValueChange={(itemValue) => setcity(itemValue)}
                  >
                    <Picker.Item label="Salvador" value="Salvador" />

                  </Picker>
                </View>
              </View>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Button color={colors.black} title="Atualizar" onPress={() => toggleModalVisibility(modalType.type)} />
                  <View style={{ paddingLeft: 20 }} />
                  <Button color="#ff5c5c" title="Cancelar" onPress={toggleModalVisibility} />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>{modalType.title}</Text>

                <TextInput
                  placeholder={modalType.holder}
                  value={inputValue} style={styles.textInput}
                  onChangeText={(value) => setInputValue(value)}
                  maxLength={modalType.maxLength}
                  keyboardType={modalType.keyboardType}
                />
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Button color={colors.black} title="Atualizar" onPress={() => toggleModalVisibility(modalType.type)} />
                  <View style={{ paddingLeft: 20 }} />
                  <Button color="#ff5c5c" title="Cancelar" onPress={toggleModalVisibility} />
                </View>
              </View>
            </View>
          )}
        </Modal>

      </View>
    </React.Fragment >
  )
}

export default Profile;
