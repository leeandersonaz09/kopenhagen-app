/* Core */
import React from 'react';
/* Presentational */
import { View, Text, Image } from 'react-native';

import styles from './styles';

function ExplorerList({ data: { img, price, title, description } }) {

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.description}>{description}</Text>
        <Text style={styles.price}>A partir de R${price}</Text>
      </View>
    </View>


  )

}


export default ExplorerList;