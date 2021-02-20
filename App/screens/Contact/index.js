import React, {useState} from 'react';
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import {  Text } from '../../components';
import styles from './styles';

const Contact = () => {

  const [userData, setuserData] = useState([]);
  
  AsyncStorage.getItem('user').then((user)=>{
   
    if (user !== null) {
      // We have data!!
      const data = JSON.parse(user)
      setuserData(data);
    
    }
  })
  .catch((err)=>{
    console.log(err)
  })
  
  //console.log(userData.photoUri)

  return (
    <SafeAreaView style={styles.Container}>
      <Image
        style={styles.headerImage}
        source={{ uri: userData.photoUri }}
      />
       <TouchableOpacity style={styles.Photobutton}>
       <Icon name="camera-outline" size={30} style={{ color: '#fff' }} />
        </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.Section}>
          <View>
            <Text style={styles.name}>Julia Grant</Text>
          </View>

          <TouchableOpacity style={styles.button}>
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
              Rua das Palmeiras, n 15 - Pituaçu
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
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
              71992616055
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
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
              leeandersonaz09@gmail.com
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
          </TouchableOpacity>

        </View>

        <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
          <TouchableOpacity
            style={styles.logoutButton}>
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Sair </Text>
            <View style={{ width: 10 }} />
            <Icon name="log-out-outline" size={30} style={{ color: '#fff' }} />
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  )
}
export default Contact;
