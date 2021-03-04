import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    TextInput
} from 'react-native';
var { height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import { useFirebase } from '../../config/firebase'
import AsyncStorage from '@react-native-community/async-storage';

export default function Banner() {

    const { getBanner } = useFirebase();
    const [dataBanner, setdataBanner] = useState([])

    /* 
        [
            "https://www.saboravida.com.br/wp-content/uploads/2019/11/kopenhagen-apresenta-o-delicioso-espetaculo-do-natal-com-novidades-1.jpg",
            "https://secrj.org.br/wp-content/uploads/2016/12/Kopenhagen.jpg",
            "https://www.saboravida.com.br/wp-content/uploads/2019/03/pascoa-2019-kopenhagen-lanca-linha-exagero-com-novos-sabores-e-mais-recheio.jpg",
        ]
    */

    const getPromo = () => {

        AsyncStorage.getItem('Banner').then((result) => {
            if(result){
                setdataBanner(JSON.parse(result))
                //console.log(result)
            }
           
        })


    }

    useEffect(() => {

        const unsubscribe = getPromo()
        return () => {
            unsubscribe
        }

    }, [])

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                <View style={{ width: width, alignItems: 'center' }} >
                    <Swiper activeDotColor={'#ffff'} style={{ height: width / 2 }} showsPagination={true} showsButtons={false} autoplayTimeout={2.3} autoplay={true} autoplayDirection={true}  >
                        {
                            dataBanner.map((itembann, index) => {
                                return (
                                    <Image key={index} index style={styles.imageBanner} resizeMode="contain" source={{ uri: itembann }} />
                                )
                            })
                        }
                    </Swiper>
                    <View style={{ height: 20 }} />
                </View>
            </View>
        </ScrollView>
    );


}

const styles = StyleSheet.create({
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    },
});