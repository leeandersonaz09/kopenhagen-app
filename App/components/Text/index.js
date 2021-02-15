import React from 'react';
import { Text as MyText } from 'react-native';
export default function Text(props) {

    return (
        <>
            <MyText style={{...props.style}}>
                {props.children}
            </MyText>
        </>
    )
}


