import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//others imports
import { Icon } from 'native-base';
//firebase imports
import * as firebase from 'firebase';
import { useFirebase } from '../../config/firebase'
//stylesheet import
import styles from './styles';
//import my componets
import { Card } from '../../components';
import { fonts, colors, metrics } from '../../styles';

export const DataItem = ({ item }) => {

    return (
        <>
            {
                item.map((data, index) => {
                    return (
                        <View key={index}>
                            <View>
                                <Text>{data.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
                                <Text> {data.quantity} </Text>
                            </View>
                            <View style={{ marginBottom: 10 }} />
                        </View>
                    )
                })
            }


        </>
    )
}

export default function Pedidos({ goToLogin }) {
    const { login, authUser, logout } = useFirebase();

    const [documentData, setdocumentData] = useState([]);

    const dataRef = firebase.firestore().collection('Pedidos');

    const getData = async () => {

        try {
            await dataRef.doc(authUser.uid).collection('cart')
                .onSnapshot(querySnapshot => {
                    if (!querySnapshot.empty) {

                        let list = [];

                        querySnapshot.forEach(doc => {
                            let mapData = Object.values(doc.data().pedido);
                            const { total, status } = doc.data();

                            list.push({
                                id: doc.id,
                                total,
                                status,
                                pedido: mapData
                            })

                            // console.log(JSON.parse(doc.data().toString()))
                        });
                        setdocumentData(list);

                    } else {
                        setdocumentData(null);
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
                        <ScrollView>
                            {documentData.map((data, index) => {
                                return (
                                    <View key={index} style={styles2.container}>
                                        <Card>
                                            <View style={styles2.content}>
                                                <View>
                                                    <Text style={styles2.data}>{data.id}</Text>
                                                </View>
                                                <View style={styles2.statusView}>
                                                    <Text style={styles2.status}>{data.status}</Text>
                                                </View>
                                            </View>

                                            <View style={styles2.separator} />
                                            <DataItem item={data.pedido} />

                                            <View style={styles2.separator} />

                                            <View style={styles2.content}>
                                                <View>
                                                    <Text style={styles2.totalText}>Total</Text>
                                                </View>
                                                <View >
                                                    <Text style={styles2.totalValue}>R${data.total}</Text>
                                                </View>
                                            </View>

                                        </Card>
                                    </View>
                                )

                            }
                            )}
                        </ScrollView>
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

        if (authUser) {
            getData()
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

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    data: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.regular
    },
    statusView: {
        backgroundColor: colors.green,
        width: 55,
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    status: {
        color: colors.white
    },
    myItens: {

    },
    separator: {
        borderColor: '#f5f5f5',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    totalText: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    },
    totalValue: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    }
});