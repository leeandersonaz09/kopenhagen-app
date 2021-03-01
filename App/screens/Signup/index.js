import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Button, Picker } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import FireFunctions from "../../config/FireFunctions";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from '../../styles'

export default function addProductScreen({ navigation }) {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [adress, setadress] = useState("")
  const [image, setimage] = useState(null)
  const [phone_number, setphone_number] = useState("")
  const [bairro, setbairro] = useState("barra");
  const [city, setcity] = useState('salvador');

  useEffect(() => {
    const subscribe = getPhotoPermission()

    return () => {
      subscribe
    }

  }, [])

  const getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status != "granted") {
        alert("We need permission to use your camera roll if you'd like to incude a photo.");
      }
    }
  };

  const handleCreate = () => {
    FireFunctions.shared
      .addUser({ username: username.trim(), phone_number: phone_number.trim(), bairro: bairro.trim(), cidade: city.trim(), email: email.trim(), password: password.trim(), adress: adress.trim(), localUri: image })
      .then(ref => {
        setusername("");
        setadress("");
        setemail("");
        setimage(null);
        setphone_number("");
        setcity("");
        setbairro("");
        navigation.push('Profile');
      })
      .catch(error => {
        alert(error);
        console.log('ERRO FIREBASE ADD USER ' + error)
      });
    navigation.push('Profile');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setimage(result.uri)
    }
  };


  return (
    <>
      <View style={styles.container}>

        <ScrollView >

          <View style={{ marginTop: 40 }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: 300 }}
              />
            ) : (
                <TouchableOpacity onPress={() => pickImage()}>
                  <Image style={styles.ButtonImg} source={require('../../assets/add_p.png')} />
                </TouchableOpacity>
              )}


            <View style={styles.filds}>


              <Text style={styles.Tittle} >Crie sua conta</Text>

              <TextInput
                placeholder="email@exemple.com"
                keyboardType="email-address"
                blurOnSubmit={false}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputEmail}
                value={email}
                onChangeText={email => setemail(email)}
              />

              <TextInput
                style={styles.inputName}
                placeholder="Nome"
                value={username}
                onChangeText={username => setusername(username)}
              />

              <TextInput
                style={styles.inputPhone}
                value={phone_number}
                placeholder="Telefone"
                maxLength={11}
                keyboardType='phone-pad'
                autoCompleteType='cc-number'
                autoCorrect={false}
                onChangeText={phone_number => setphone_number(phone_number)}
              />

              <TextInput
                style={styles.inputadress}
                value={adress}
                placeholder="Endereço"
                autoCorrect={false}
                onChangeText={adress => setadress(adress)}
              />
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
              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={password => setpassword(password)}
              />

              <View style={styles.ButtonSend}>
                <Button
                  status='success'
                  title='Cadastrar'
                  onPress={() => handleCreate()}
                  disabled={
                    image && username && adress && password && email && phone_number && city && bairro
                      ? false
                      : true
                  }>
                </Button>

              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  onePicker: {
    width: 170,
    height: 44,
    borderColor: colors.black,
    borderWidth: 1,
  },
  onePickerItem: {
    height: 14,
    color: colors.red
  },
  filds: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginBottom: 40
  },
  Tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20
  },
  ButtonImg: {
    marginBottom: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  },
  ButtonSend: {
    marginTop: 20,

  },
  inputName: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  },
  inputPhone: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  },
  inputadress: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 10,
    borderRadius: 20
  }

});
