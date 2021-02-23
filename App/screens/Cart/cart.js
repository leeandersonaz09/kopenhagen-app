import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	calculateTotalSelector,
	removeItem,
	incrementItem,
	decrementItem,
	itemsCartSelector,
} from "../../store/cart";

import Item from '../../components/Item';
import { Icon } from 'native-base';

import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default function Cart() {
	const [userData, setuserData] = useState([]);
	const cart = useSelector(itemsCartSelector);
	let total = useSelector(calculateTotalSelector).toFixed(2);
	const dispatch = useDispatch();


	AsyncStorage.getItem('user').then((user) => {

		if (user !== null) {
			// We have data!!
			const data = JSON.parse(user)
			setuserData(data);

		}
	})
		.catch((err) => {
			console.log(err)
		})

	function removeItemCart(item) {
		//console.log(item.id);
		dispatch(removeItem(item.id));

		showMessage({
			message: `${item.title} excluido com sucesso`,
			type: 'warning'
		});
	}

	function onChangeQuan(item, type) {

		if (type) {
			dispatch(incrementItem(item));
		}
		else if (type == false && item.quantity >= 2) {
			dispatch(decrementItem(item))
		}
	}

	async function onsendRequest() {
		if (userData) {

			firebase.firestore()
				.collection("Pedidos")
				.doc(firebase.auth().currentUser.uid)
				.add({
					data: new Date().toLocaleString(),
					cart: cart,
					total: total,
					adress: userData.adress,
					phone: userData.phone,
					email: userData.email
				})
				.then(ref => {
					showMessage({
						message: `Seu pedido foi enviado com sucesso`,
						type: 'sucess'
					});
				})
				.catch(error => {
					console.log(error)
				});
		}else{
			showMessage({
				message: `Você precisa estar logado para confirmar o pedido!`,
				type: 'warning'
			});
		}
	}

	return (
		<React.Fragment>
			{cart.length > 0 ? (
				<><ScrollView>
					<FlatList
						style={{ padding: 10 }}
						keyExtractor={(item) => String(item.id)}
						data={cart}
						renderItem={({ item }) => <Item
							item={item}
							onDecrement={() => onChangeQuan(item, false)}
							onIncrement={() => onChangeQuan(item, true)}
							removeItemCart={() => removeItemCart(item)} />}
					/>
					<View style={styles.totalContainer}>

						<View style={styles.totalSection}>

							<Text style={styles.totalText}>Total</Text>

							<View style={styles.subTotalSection}>
								<Text style={styles.textsubTotal}>Sub Total</Text>
								<View style={styles.divider} />
								<Text style={styles.pricesubTotal}>R${total}</Text>
							</View>

							<View style={styles.subTotalSection}>
								<Text style={styles.textsubTotal}>Frete</Text>
								<View style={styles.divider} />
								<Text style={styles.pricesubTotal}>R$10</Text>
							</View>

							<View style={styles.subTotalSection}>
								<Text style={styles.textsubTotal}>Total</Text>
								<View style={styles.divider} />
								<Text style={styles.pricesubTotal}>R${total}</Text>
							</View>

						</View>

						<View style={styles.buttonSection}>
							<TouchableOpacity
								style={styles.Button}
								onPress={()=>onsendRequest()}
								>
								<Text style={styles.textButton}>Concluir Pedido</Text>
								<View style={{ width: 10 }} />
								<Icon name="cloud-upload-outline" size={30} style={{ color: '#fff' }} />
							</TouchableOpacity>
						</View>

					</View>
				</ScrollView>
				</>
			) : (
				<View style={styles.container2}>
					<Text style={styles.textMessage}>Sem produtos no carrinho</Text>
				</View>
			)}
		</React.Fragment>
	);
}
