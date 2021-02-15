import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';

function lottieLoading({data, text, color, tcolor}) {

    return (

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <Lottie source={data} style={{ width: 220, height: 220 }} autoPlay loop />
        </View>

    );

}

export default lottieLoading;