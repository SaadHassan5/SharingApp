import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class ChatComp extends React.Component {
  render() {
    return (
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M5.61261 16.4761L6.33873 16.8643C7.46401 17.4659 8.72066 17.7797 9.99666 17.7778L10 17.7778C14.2957 17.7778 17.7778 14.2957 17.7778 10C17.7778 5.7043 14.2957 2.22222 10 2.22222C5.70431 2.22222 2.22223 5.7043 2.22223 10V10.0033C2.22031 11.2793 2.53414 12.536 3.13574 13.6613L3.52394 14.3874L2.92704 17.073L5.61261 16.4761ZM1.12865e-05 20L1.17601 14.709C0.401543 13.2604 -0.00246185 11.6426 1.12865e-05 10C1.12865e-05 4.477 4.47701 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.35736 20.0025 6.73962 19.5985 5.29101 18.824L1.12865e-05 20Z" fill={this.props.col} />
      </Svg>
    )
  }
}