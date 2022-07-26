import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../theme';

const ItemSeparator = ({style}) => {
  return <View style={[styles.separator,style]}/>
}

export default ItemSeparator;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: colors.border
  }
})