import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Tabs, Tab, TabHeading, Icon, ScrollableTab } from 'native-base';
import Tab1 from './cart';
import Tab2 from './pedidos'
import styles from './styles';
import colors from '../../styles/colors';

export default function Cart({ navigation }) {

	function goToLogin() {
		navigation.navigate('Profile')
	}

	const renderTabBar = (props) => {
		props.tabStyle = Object.create(props.tabStyle);
		return <DefaultTabBar {...props} />;
	};

	return (
		<>
			<SafeAreaView style={{ backgroundColor: colors.black }} />

			<Tabs renderTabBar={renderTabBar} tabBarBackgroundColor={colors.black} tabBarUnderlineStyle={{ backgroundColor: colors.yellow }} renderTabBar={() => <ScrollableTab />}>
				<Tab heading={<TabHeading style={{ backgroundColor: colors.black }}><Icon style={styles.TabIcon} name="md-cart" /><Text style={styles.TabText} >Meu carrinho</Text></TabHeading>}>
					<Tab1 />
				</Tab>
				<Tab heading={<TabHeading style={{ backgroundColor: colors.black }}><Icon style={styles.TabIcon} name="archive-outline" /><Text style={styles.TabText} >Meus pedidos</Text></TabHeading>}>
					<Tab2 goToLogin={() => goToLogin()} />
				</Tab>
			</Tabs>
		
		</>

	);
}
