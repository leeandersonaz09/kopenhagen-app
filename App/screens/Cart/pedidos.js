import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import * as firebase from 'firebase';
import {useFirebase} from '../../config/firebase' 

export default function Pedidos({ goToLogin }) {
    const { login, authUser, logout } = useFirebase();

    const [documentData, setdocumentData] = useState();
    const dataRef = firebase.firestore().collection('Pedidos');

    const getData = async () => {
        setdocumentData([])
        try {
            await dataRef.doc(firebase.auth().currentUser.uid).collection('cart')
                .onSnapshot(querySnapshot => {

                    if (!querySnapshot.empty) {

                        const list = [];

                        querySnapshot.forEach(doc => {

                            const { img, data, title, price, status } = doc.data();
                            list.push({
                                id: doc.id,
                                img,
                                title,
                                price,
                                data,
                                status: status
                            });
                        });
                        setdocumentData(list);
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }

    const renderNologgeding = () => {
        return (
            <>
                <View style={styles.container2}>
                    <Text style={styles.textMessage}>Faça login para ver seus pedidos em andamento</Text>
                    <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
                        <TouchableOpacity
                            onPress={() => goToLogin()}
                            style={styles.loginButton}>
                            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Ir par login </Text>
                            <View style={{ width: 10 }} />
                            <Icon name="log-in-outline" size={30} style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
    console.log(documentData)

    const renderData = () => {
        return (
            <>
                { documentData ? (
                    <>

                        {documentData.map((data, index) =>
                           <View style={styles.container2}>
                               <Text>{data.title}</Text>
                                <Text>{data.status}</Text>
                           </View>
                        )}

                    </>
                ) : (
                    <>
                        <View style={styles.container2}>
                            <Text style={styles.textMessage}>Nenhum Pedido</Text>
                        </View>
                    </>
                )}
            </>
        )
    }

    useEffect(() => {
        getData()

    }, [])

    return (
        <>
            {
                authUser ? (
                    renderData()
                ) : (
                    renderNologgeding()
                )
            }

        </>

    );
}