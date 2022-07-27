
import React,{useEffect,useState} from 'react';
import { StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
    container:{
        flex:1
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5, elevation: 5,
      },
})