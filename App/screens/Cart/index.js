import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/ducks/cart';
import Item from '../../components/Item';
import { Icon } from 'native-base';

import { showMessage } from 'react-native-flash-message';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../../components';

export default function Cart() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();


	function removeItemCart(item) {
		console.log(item.key);
		dispatch(removeItem(item.key));

		showMessage({
			message: `${item.tittle} excluido com sucesso`,
			type: 'warning'
		});
	}

	function onChangeQuan(i, type) {
		const dataCar = cart
		//console.log(cart[i].quality)
		//let cantd = dataCar[i].quality;

		return
		if (type) {
			cantd = cantd + 1
			dataCar[i].quality = cantd
			this.setState({ dataCart: dataCar })
		}
		else if (type == false && cantd >= 2) {
			cantd = cantd - 1
			dataCar[i].quality = cantd
			this.setState({ dataCart: dataCar })
		}
		else if (type == false && cantd == 1) {
			dataCar.splice(i, 1)
			this.setState({ dataCart: dataCar })
		}
	}

	return (
		<React.Fragment>
			<SafeAreaView style={styles.container}>
				<Header>
					<View style={{ marginTop: 50 }}>
						<Text style={styles.headerTitle}>Carrinho</Text>
					</View>
				</Header>

				{cart.length > 0 ? (
					<><ScrollView>
						<FlatList
							style={{ padding: 10 }}
							keyExtractor={(item) => String(item.data.key)}
							data={cart}
							renderItem={({ item }) => <Item item={item} removeItemCart={removeItemCart} onChangeQuan={onChangeQuan} />}
						/>
						<View style={styles.totalContainer}>

							<View style={styles.totalSection}>

								<Text style={styles.totalText}>Total</Text>

								<View style={styles.subTotalSection}>
									<Text style={styles.textsubTotal}>Sub Total</Text>
									<View style={styles.divider} />
									<Text style={styles.pricesubTotal}>R$50</Text>
								</View>

								<View style={styles.subTotalSection}>
									<Text style={styles.textsubTotal}>Frete</Text>
									<View style={styles.divider} />
									<Text style={styles.pricesubTotal}>R$10</Text>
								</View>

								<View style={styles.subTotalSection}>
									<Text style={styles.textsubTotal}>Total</Text>
									<View style={styles.divider} />
									<Text style={styles.pricesubTotal}>R$60</Text>
								</View>

							</View>

							<View style={styles.buttonSection}>
								<TouchableOpacity
									style={styles.Button}>
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

			</SafeAreaView>
		</React.Fragment>
	);
}
