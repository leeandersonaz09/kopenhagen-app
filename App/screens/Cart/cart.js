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
import { useFirebase } from '../../config/firebase'

export default function CartItem() {
	const { authUser, getDocument, saveDocument, saveDocumentPedidos } = useFirebase();
	const [userData, setuserData] = useState([]);
	const cart = useSelector(itemsCartSelector);
	let total = useSelector(calculateTotalSelector).toFixed(2);
	const dispatch = useDispatch();

	function removeItemCart(item) {
		//console.log(item.id);
		dispatch(removeItem(item.id));

		showMessage({
			message: `${item.title} excluido com sucesso`,
			type: 'success'
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

		if (authUser) {

			let counter = cart.length;
			let pedido = [];

			while (counter > 0) {
				cart.map(async (data) => {
					let id = data.id
					//console.log(data)
					pedido.push({
						id,
						quantity: data.quantity,
						title: data.title,
						price: data.price,
						img: data.img
					})
					dispatch(removeItem(id));
					counter--
				})			
			}	
			console.log(pedido)

			await saveDocumentPedidos(
				new Date().toLocaleString(),
				{pedido, total: total, status:'ativo'}
			);

			showMessage({
				message: `Pedidos enviados com sucesso!`,
				type: 'success'
			});

		} else {
			showMessage({
				message: `Você precisa estar logado para confirmar o pedido!`,
				type: 'warning'
			});
		}
	}

	return (
		<React.Fragment>
			{cart.length > 0 ? (				
					<ScrollView>
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
									onPress={() => onsendRequest()}
								>
									<Text style={styles.textButton}>Concluir Pedido</Text>
									<View style={{ width: 10 }} />
									<Icon name="cloud-upload-outline" size={30} style={{ color: '#fff' }} />
								</TouchableOpacity>
							</View>

						</View>
					</ScrollView>
			
			) : (
					<View style={styles.container2}>
						<Text style={styles.textMessage}>Sem produtos no carrinho</Text>
					</View>
				)}
		</React.Fragment>
	);
}
