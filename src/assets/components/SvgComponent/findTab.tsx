import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class FindTab extends React.Component {
  render() {
    return (
      <Svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M0.0356136 8.77958C0.451849 3.81827 4.67162 0 9.73841 0H10.2616C15.3284 0 19.5482 3.81827 19.9644 8.77958C20.1885 11.4508 19.3487 14.1032 17.6218 16.1782L11.8162 23.1541C10.8775 24.282 9.12249 24.282 8.18379 23.1541L2.37816 16.1782C0.651324 14.1032 -0.188491 11.4508 0.0356136 8.77958ZM14.2761 8.36656C14.6309 8.018 14.6309 7.45287 14.2761 7.1043C13.9213 6.75574 13.3461 6.75574 12.9914 7.1043L9.39434 10.6384L7.61419 8.8894C7.25942 8.54084 6.68423 8.54084 6.32946 8.8894C5.97469 9.23797 5.97469 9.8031 6.32946 10.1517L8.75198 12.5318C9.10674 12.8804 9.68194 12.8804 10.0367 12.5318L14.2761 8.36656Z" fill={this.props.col} />
      </Svg>

    )
  }
}