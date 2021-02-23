import React from 'react';
import {
    View,
    TouchableOpacity,
  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';


const Profile = ({ data: { img, title } }) => (
    <>
        <View style={styles.Section}>
            <View>
                <Text style={styles.name}>{userData.name}</Text>
            </View>

            <TouchableOpacity onPress={() => {
                setmodalType({
                    title: 'Atualizar Nome',
                    holder: "Digite seu nome...",
                    type: "name"
                })
                setModalVisible(!isModalVisible);
            }} style={styles.button}>

                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
            </TouchableOpacity>

        </View>

        <View style={styles.separator} />

        <View style={styles.Section}>
            <View style={styles.iconText}>
                <MaterialIcons
                    name="map"
                    color="#969696"
                    size={24} />
                <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.adress}>
                    {userData.adress}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {
                setmodalType({
                    title: 'Atualizar Endereço',
                    holder: "Digite seu endereço...",
                    type: "adress"
                })
                setModalVisible(!isModalVisible);
            }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
            </TouchableOpacity>

        </View>

        <View style={styles.separator} />


        <View style={styles.Section}>
            <View style={styles.iconText}>
                <MaterialIcons
                    name="phone"
                    color="#969696"
                    size={24} />
                <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.phone}>
                    {userData.phone}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {
                setmodalType({
                    title: 'Atualizar Telefone',
                    holder: "Digite seu telefone...",
                    type: "phone"
                })
                setModalVisible(!isModalVisible);
            }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
            </TouchableOpacity>

        </View>

        <View style={styles.separator} />

        <View style={styles.Section}>
            <View style={styles.iconText}>
                <MaterialIcons
                    name="mail"
                    color="#969696"
                    size={24} />
                <Text
                    nnumberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.email}>
                    {userData.email}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {
                setmodalType({
                    title: 'Atualizar Email',
                    holder: "Digite seu email...",
                    type: "email"
                })
                setModalVisible(!isModalVisible);
            }} style={styles.button}>
                <MaterialIcons name="arrow-forward-ios" color="#969696" size={25} />
            </TouchableOpacity>

        </View>

        <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 70 }}>
            <TouchableOpacity
                onPress={() => logOut()}
                style={styles.logoutButton}>
                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Sair </Text>
                <View style={{ width: 10 }} />
                <Icon name="log-out-outline" size={30} style={{ color: '#fff' }} />
            </TouchableOpacity>
        </View>
    </>
);

export default Profile;