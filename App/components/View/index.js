import React from 'react';
import { SafeAreaView as MyView } from 'react-native';
import { colors } from '../../styles';
export default function View(props) {

  return (
    <>
      <MyView style={{ backgroundColor: colors.white, ...props.style }}>
        {props.children}
      </MyView>
    </>

  )
}
