import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class HomeTab extends React.Component {
    render() {
      return (
        <Svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12.3638 1.00763C11.0708 -0.335875 8.92924 -0.335877 7.6363 1.00762L1.32114 7.56976C0.958449 7.94663 0.71473 8.42307 0.620688 8.93906C-0.146269 13.1472 -0.202882 17.4552 0.453227 21.6823L0.685518 23.1788C0.758888 23.6515 1.16353 24 1.63904 24H6.0518C6.41522 24 6.70984 23.7036 6.70984 23.3379V14.0689H13.2902V23.3379C13.2902 23.7036 13.5848 24 13.9483 24H18.361C18.8365 24 19.2411 23.6515 19.3145 23.1788L19.5468 21.6823C20.2029 17.4552 20.1463 13.1472 19.3793 8.93906C19.2853 8.42307 19.0416 7.94663 18.6789 7.56976L12.3638 1.00763Z" fill={this.props.col}/>
        </Svg>
    )
      }
}