import React from 'react';
// import { FontAwesome } from '@expo/vector-icons';  
import IconFont from 'react-native-vector-icons/FontAwesome';  
import { View } from 'react-native';

export default function Icon({name,iconColor}) {
  return (
    <View style={{marginRight:15}}>
        <IconFont name={name} color={iconColor} size={16} />
    </View>
  )
}