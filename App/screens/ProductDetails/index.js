import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { Icon, Button } from 'native-base';
import styles from './styles';
import { colors } from "../../styles"

function ProductDetails({ route, navigation }) {
    /* 2. Get the param */
    const { id } = route.params;
    const { tittle } = route.params;
    const { price } = route.params;
    const { description } = route.params;
    const { img } = route.params;

    useEffect(() => {
        //AsyncStorage.clear();

    }, []);

    function onClickAddCart() {

        const itemcart = {
            id: id,
            tittle: tittle,
            description: description,
            img: img,
            quantity: 1,
            price: parseFloat(price)
        }

        AsyncStorage.getItem('cart').then((datacart) => {
            if (datacart !== null) {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            else {
                const cart = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            alert("Adicionado ao carrinho!")
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const renderList = ({ key, name }) => {
        return (
            <>
                { name ? (
                    <View>
                        <TouchableOpacity style={[styles.btnColor, { backgroundColor: name }]}></TouchableOpacity>
                    </View>

                ) : <></>}
            </>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={styles.productImg} source={{ uri: img }} />
                    <Text style={styles.name}>{tittle}</Text>
                    <Text style={styles.price}>R${price}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>

                <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                    <TouchableOpacity
                        onPress={() => onClickAddCart()}
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

export default ProductDetails;