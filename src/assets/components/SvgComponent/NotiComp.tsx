import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class NotiComp extends React.Component {
  render() {
    return (
      <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6.62056 18.1488C6.62056 19.1721 7.46111 20 8.5 20C9.53889 20 10.3794 19.1721 10.3794 18.1488H6.62056ZM8.5 4.18605C11.1067 4.18605 13.2222 6.26977 13.2222 8.83721V15.3488H3.77778V8.83721C3.77778 6.26977 5.89333 4.18605 8.5 4.18605ZM8.5 0C7.71611 0 7.08333 0.623256 7.08333 1.39535V2.48372C4.11778 3.11628 1.88889 5.72093 1.88889 8.83721V14.4186L0 16.2791V17.2093H17V16.2791L15.1111 14.4186V8.83721C15.1111 5.72093 12.8822 3.11628 9.91667 2.48372V1.39535C9.91667 0.623256 9.28389 0 8.5 0Z" fill={this.props.col} />
      </Svg>

    )
  }
}