import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Tabs, Container, Header, Tab, TabHeading, Icon, ScrollableTab } from 'native-base';
import Item from '../../components/Item';
import Tab1 from './cart';
import Tab2 from './pedidos'
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

export default function Cart({navigation}) {

	function goToLogin(){
		navigation.navigate('Tab3')
	}

	return (
		<>
			<Container>
				<Tabs tabBarBackgroundColor={colors.black} tabBarUnderlineStyle={{ backgroundColor: colors.yellow }} renderTabBar={() => <ScrollableTab />}>
					<Tab heading={<TabHeading style={{ backgroundColor: colors.black }}><Icon style={styles.TabIcon} name="md-cart" /><Text style={styles.TabText} >Meu carrinho</Text></TabHeading>}>
						<Tab1 />
					</Tab>
					<Tab heading={<TabHeading style={{ backgroundColor: colors.black }}><Icon style={styles.TabIcon} name="archive-outline" /><Text style={styles.TabText} >Meus pedidos</Text></TabHeading>}>
						<Tab2 goToLogin={()=> goToLogin()}/>
					</Tab>
				</Tabs>
			</Container>
		</>

	);
}
