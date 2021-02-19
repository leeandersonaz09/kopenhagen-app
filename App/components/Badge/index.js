import React from 'react';
import { View, Text } from 'react-native';

import { useSelector } from 'react-redux';
import { cartQuantitySelector } from "../../store/cart";

import styles from './styles';

export default function Badge() {
	const length = useSelector(cartQuantitySelector);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{length}</Text>
		</View>
	);
}
