import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView,  ImageBackground, Text } from 'react-native';
import styles from './styles';
import { Category } from '../../components';

export default function Home({ navigation }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    setData(
      [
        {
          key: 1,
          img: require('../../assets/01.png'),
          category: "classicos",
          tittle: "Clássicos"
        },
        {
          key: 2,
          img: require('../../assets/02.png'),
          category: "infantil",
          tittle: "Infantil"
        },
        {
          key: 3,
          img: require('../../assets/03.png'),
          category: "soulgood",
          tittle: "Soul Good"
        },
        {
          key: 4,
          img: require('../../assets/04.png'),
          category: "variedades",
          tittle: "Variedades"
        },
        {
          key: 5,
          img: require('../../assets/05.png'),
          category: "presentes",
          tittle: "Presentes"
        },
        {
          key: 6,
          img: require('../../assets/06.png'),
          category: "keepkop",
          tittle: "Keepkop"
        },
        {
          key: 7,
          img: require('../../assets/07.png'),
          category: "tabletes",
          tittle: "Tabletes"
        },
        {
          key: 8,
          img: require('../../assets/08.png'),
          category: "outros",
          tittle: "Outros"
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
      <ScrollView>
        <ImageBackground
          source={require('../../assets/homeimg.jpg')}
          style={styles.backgrounImage}
          imageStyle={{ borderBottomRightRadius: 45 }}
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

