import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from "../../store/cart";
import { showMessage } from 'react-native-flash-message';
import { Icon} from 'native-base';
import styles from './styles';


function ProductDetails({ route, navigation }) {

    const dispatch = useDispatch();
    /* 2. Get the param */
    const data = route.params;
    
    function addItemCart(item) {
        //console.log(item)
		dispatch(addItem(item));

		showMessage({
			message: `${item.title} adicioando com sucesso`,
			type: 'success'
		});
	}

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={styles.productImg} source={{ uri: data.img }} />
                    <Text style={styles.name}>{data.title}</Text>
                    <Text style={styles.price}>R${data.price}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                </View>

                <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 40 }}>
                    <TouchableOpacity
                        key={data.id}
                        onPress={() => addItemCart(data)}
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