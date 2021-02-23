import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

import { MaterialIcons } from '@expo/vector-icons';

export default function Item({ item, removeItemCart, onDecrement, onIncrement}) {

	return (
		<SafeAreaView >
			<ScrollView>
				<View style={styles.content}>
					<View style={styles.card}>
						<Image style={styles.image} source={{ uri: item.img }} />

						<View style={styles.titleSection}>

							<View style={styles.headerSection}>
								<Text numberOfLines={1} style={styles.titleName}>{item.title}</Text>
								<Text numberOfLines={1} style={styles.description}>R${item.price}</Text>
							</View>

							<View style={styles.actions}>
								<TouchableOpacity
									onPress={()=>onDecrement()}
									style={styles.Button}>
									<MaterialIcons name="remove" color="#000" size={28} />
								</TouchableOpacity>

								<Text style={styles.caption}> {item.quantity}</Text>

								<TouchableOpacity
									onPress={()=>onIncrement()}
									style={styles.Button}>
									<MaterialIcons name="add" color="#000" size={28} />
								</TouchableOpacity>

							</View>

						</View>
					</View>

					<View style={styles.priceSection}>
						<View />
						<View style={styles.removeCart}>
							<TouchableOpacity style={styles.btn} onPress={() => removeItemCart()}>
								<MaterialIcons name="delete" color="#ffff" size={24} />
							</TouchableOpacity>
						</View>
					</View>

				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
