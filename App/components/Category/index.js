/* Core */
import React from 'react';
/* Presentational */
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';

const Category = ({ data: { img, title } }) => (
  <>
    <View style={styles.container}>
      <ImageBackground
        source={img}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.darkOverlay}></View>
        <View style={styles.TextImageContainer}>
          <Text style={styles.TextImage}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  </>
);

export default Category;