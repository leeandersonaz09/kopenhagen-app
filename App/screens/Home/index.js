import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView,  ImageBackground, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { Category, Banner } from '../../components';
export default function Home({ navigation }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    setData(
      [
        {
          key: 1,
          img: require('../../assets/01.png'),
          category: "classicos",
          title: "Clássicos"
        },
        {
          key: 2,
          img: require('../../assets/02.png'),
          category: "infantil",
          title: "Infantil"
        },
        {
          key: 3,
          img: require('../../assets/03.png'),
          category: "soulgood",
          title: "Soul Good"
        },
        {
          key: 4,
          img: require('../../assets/04.png'),
          category: "variedades",
          title: "Variedades"
        },
        {
          key: 5,
          img: require('../../assets/05.png'),
          category: "presentes",
          title: "Presentes"
        },
        {
          key: 6,
          img: require('../../assets/06.png'),
          category: "keepkop",
          title: "Keepkop"
        },
        {
          key: 7,
          img: require('../../assets/07.png'),
          category: "tabletes",
          title: "Tabletes"
        },
        {
          key: 8,
          img: require('../../assets/08.png'),
          category: "outros",
          title: "Outros"
        },
      ]
    )

  }, []);

  const renderItens = () => {

    return (
      <> 
        <View style={styles.ProductContainer}>

          {data.map((data, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => navigation.push('Catálogo', {
                category: data.category,
              })}
            >
              <Category data={data} />
            </TouchableOpacity>
          )}

        </View>
      </>
    )

  }

  return (

    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' ? <StatusBar style="light" /> : null}
      <ScrollView>
        <View style={{paddingTop:20}}/>
      <Banner/>
        <ImageBackground
          source={require('../../assets/homeimg.jpg')}
          style={styles.backgrounImage}
          imageStyle={{ borderRadius: 25 }}
        >
          <View style={styles.darkOverlay}></View>
          <View style={styles.imageContainer}>
            <Text style={styles.UserGreat}>Categorias</Text>
          </View>

        </ImageBackground>
        
        {renderItens()}
        
      </ScrollView>
    </SafeAreaView>
  );
}

