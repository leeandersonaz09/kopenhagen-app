import React from 'react';
import {View, StyleSheet} from 'react-native'
import {colors} from '../../styles';

export default function Header(props) {

    return (
        <>
            <View style={styles.header}>
                {props.children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    header: {
        height: 70,
        width: '100%',
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',         
        shadowOffset: {width:1, height:1},
        shadowColor:'#333',
        shadowOpacity: 0.3,
        shadowRadius: 3
      },

})
