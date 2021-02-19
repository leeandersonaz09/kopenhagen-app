import React from 'react';
import { View, SafeAreaView, Image,TouchableOpacity } from 'react-native';
import { Icon, Thumbnail, Button } from 'native-base';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Card, WaveSvg, Text, View as MyView } from '../../components';
import styles from './styles';
import { colors } from '../../styles';

const Contact = () => {

  return (
    <SafeAreaView style={styles.Container}>
      <Image
        style={styles.headerImage}
        source={{ uri: 'https://yata.ostr.locaweb.com.br/cae1a6e97975315db2aed7cc9319e76b1dd07d0854ae176f86709220cac4d233' }}
      />
      <View style={[styles.content]}>
        <View>
          <Text>Name</Text>
          <TouchableOpacity>
            <MaterialIcons name="pencil" color="#000" size={28} />
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  )
}
export default Contact;
