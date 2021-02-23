import React, { useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import * as firebase from 'firebase';
export default function Pedidos({ goToLogin }) {

    return (
        <>
            {
                firebase.auth().currentUser ? (
                    <>
                        <View style={styles.container2}>
                            <Text style={styles.textMessage}>Nenhum Pedido</Text>

                        </View>
                    </>
                ) : (
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

        </>

    );
}