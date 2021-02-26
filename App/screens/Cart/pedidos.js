import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import * as firebase from 'firebase';
import { useFirebase } from '../../config/firebase'

export default function Pedidos({ goToLogin }) {
    const { login, authUser, logout } = useFirebase();

    const [documentData, setdocumentData] = useState();
    const dataRef = firebase.firestore().collection('Pedidos');

    const getData = async () => {
        setdocumentData([])
        try {
            await dataRef.doc(authUser.uid).collection('cart')
                .onSnapshot(querySnapshot => {

                    if (!querySnapshot.empty) {

                       const list = [];

                        querySnapshot.forEach(doc => {
                            const { id, quantity } = doc.data();
                            list.push({
                                id,
                                quantity,
                                data: doc.id,
                                total: doc.data().total,
                                status: doc.data().status,
                            })
                            let mapData = Object.values(doc.data());
                            console.log(JSON.parse(doc._document.data.toString()))
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

    const renderData = () => {
        return (
            <>
                { documentData ? (
                    <>

                        {documentData.map((data, index) =>
                            <View key={index}>
                                {console.log(data)}
                                <Text>{data.data}</Text>
                                <Text>{data.total}</Text>
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

        if(authUser){
           // getData()
        }
        

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