import React from 'react';
import {View, StyleSheet} from 'react-native';
import { colors } from '../theme';

function genCircleStyle(size) {
  if (!size) {
    return {};
  }
  return {width: size, height: size, borderRadius: size / 2};
}

function Dot({isActive, color, activeDotSize, inActiveDotSize,dotSeparator}) {
  const processedActiveDotStyle = [
    styles.activeDot,
    {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(activeDotSize),
    },
  ];
  const processedInActiveDotStyle = [
    styles.inActiveDot,
    {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(inActiveDotSize),
    },
  ];
  return (
    <View
      style={[
        styles.baseDot,
        isActive ? processedActiveDotStyle : processedInActiveDotStyle,
      ]}
    />
  );
}

export default function PaginationBullet(props) {
  const {style,length,currentIndex = 0,color = colors.primary,
  activeDotSize = 15,inActiveDotSize = 11,dotSeparator = 10} = props;
  function renderItem(item, index) {
    return (
      <Dot
        key={index}
        isActive={index === currentIndex}
        color={color}
        activeDotSize={activeDotSize}
        inActiveDotSize={inActiveDotSize}
        dotSeparator={dotSeparator}
      />
    );
  }
  return (
    <View style={[styles.container, style]}>
      {Array(length).fill(0).map(renderItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseDot: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inActiveDot: {
    backgroundColor: 'transparent',
  },
});
