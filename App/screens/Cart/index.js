import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/ducks/cart';
import Item from '../../components/Item';

import { showMessage } from 'react-native-flash-message';

import styles from './styles';

export default function Cart() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	function removeItemCart(item) {
		console.log(item);
		dispatch(removeItem(item.key));

		showMessage({
			message: `${item.tittle} excluido com sucesso`,
			type: 'warning'
		});
	}

	return (
		<React.Fragment>
			<SafeAreaView>
				{cart.length > 0 ? (
					<>
						<FlatList
							style={{ padding: 10 }}
							keyExtractor={(item) => String(item.key)}
							data={cart}
							renderItem={({ item }) => <Item item={item} removeItemCart={removeItemCart} />}
						/>
						<View style={styles.totalContainer}>
							<View style={styles.totalSection}>
								<Text style={styles.totalText}>Total</Text>
								<View style={styles.subTotal}>
									<Text style={styles.textsubTotal}>Subtotal</Text>
									<Text style={styles.pricesubTotal}>R$50</Text>
								</View>
							</View>
						</View>

					</>
				) : (
					<View style={styles.container}>
						<Text style={styles.textMessage}>Sem produtos no carrinho</Text>
					</View>
				)}
			</SafeAreaView>
		</React.Fragment>
	);
}
