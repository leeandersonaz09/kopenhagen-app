import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

import { MaterialIcons } from '@expo/vector-icons';


export default function Item({ item, removeItemCart }) {
	return (
		<SafeAreaView >
			<ScrollView>
				<View style={styles.content}>
					<View style={styles.card}>
						<Image style={styles.image} source={{ uri: item.img }} />
						<View style={styles.titleSection}>
							<View>
								<Text style={styles.titleName}>Titulo</Text>
								<Text style={styles.description}>descricao</Text>
							</View>
							<View style={styles.actions}>
								<Text style={styles.caption}> -- </Text>
								<Text style={styles.caption}> 1 </Text>
								<Text style={styles.caption}> + </Text>
							</View>
						</View>
					</View>
					<View style={styles.priceSection}>
						<Text style={styles.price}>R${item.price}</Text>
						<View style={styles.removeCart}>
							<TouchableOpacity style={styles.btn} onPress={() => removeItemCart(item)}>
								<MaterialIcons name="delete" color="#ffff" size={24} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

/*
			<View style={styles.container}>
				<Image style={styles.image} source={{ uri: item.img }} />
				<View style={styles.description}>
					<Text style={styles.title}>Nome do Carro</Text>
					<Text style={styles.titleName}>{item.tittle}</Text>
				</View>
				<TouchableOpacity style={styles.btn} onPress={() => removeItemCart(item)}>
					<MaterialIcons name="remove-shopping-cart" color="#ff0000" size={24} />
				</TouchableOpacity>
			</View>

	container: {
	height: 80,
	borderWidth: 1,
	borderColor: '#ccc',
	borderRadius: 5,
	marginBottom: 10,
	flexDirection: 'row',
	justifyContent: 'space-between'
	},
	image: {
		height: 80,
		width: 100,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	description: {
		flex: 2,
		padding: 10
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18
	},
	titleName: {
		color: 'gray'
	},
	btn: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	}

*/