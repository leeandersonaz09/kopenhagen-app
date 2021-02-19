import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from 'native-base';
import styles from './styles';


function DetailsContainer({ item, addItemCart }) {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={styles.productImg} source={{ uri: item.img }} />
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.price}>R${item.price}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>

                <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                    <TouchableOpacity
                        onPress={() => addItemCart(item)}
                        style={styles.addCartButton}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Adicionar ao </Text>
                        <View style={{ width: 10 }} />
                        <Icon name="ios-cart" size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default DetailsContainer;