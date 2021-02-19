import React from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
//import { useSelector } from 'react-redux';

import styles from './styles';
		
 const Badge = (props) => {
	//const length = useSelector((state) => state.cart.length);

	const length = props.cart.length;
	console.log(length)
	
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{length}</Text>
		</View>
	);
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }

}

export default connect(mapStateToProps)(Badge);