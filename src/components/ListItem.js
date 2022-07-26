import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import AppText from './AppText';
import ItemSeparator from './Separator';
import { colors } from '../theme';
import ArrowRight from '../svg/ArrowRight';

const ListItem = ({onPress,icon,color,title,subtitle,style,arrow}) => {
  return (
    <Pressable onPress={onPress}>
    <View style={[styles.container,style,arrow && {marginBottom:5}]}>
      <View style={[styles.iconBg,{backgroundColor:color}]}>
        {icon && icon}
      </View>
      <View style={[styles.textContainer,arrow && {flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexGrow:1}]}>
        <AppText style={styles.title} preset='h4'>{title} {subtitle && ':'} {subtitle && <AppText> {subtitle}</AppText>} </AppText>

          {arrow && <ArrowRight/>}

      </View>
    </View>

     {!arrow && <ItemSeparator  />}
    </Pressable>
  )
}

export default ListItem;

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
    paddingTop:15
  },
  iconBg: {
    width: 42,
    height: 42,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center'
  },
  textContainer:{
    marginLeft:20
  },
  title:{
    color:colors.black,
  }
})