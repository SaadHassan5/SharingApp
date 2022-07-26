import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class PlusTab extends React.Component {
    render() {
      return (
        <Svg width="20" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M10.1739 1.17391C10.1739 0.525579 9.64833 0 9 0C8.35167 0 7.82609 0.525579 7.82609 1.17391V7.82609H1.17391C0.525579 7.82609 0 8.35166 0 9C0 9.64833 0.525579 10.1739 1.17391 10.1739H7.82609V16.8261C7.82609 17.4744 8.35167 18 9 18C9.64833 18 10.1739 17.4744 10.1739 16.8261V10.1739H16.8261C17.4744 10.1739 18 9.64833 18 9C18 8.35167 17.4744 7.82609 16.8261 7.82609H10.1739V1.17391Z" fill={this.props.col}/>
        </Svg>
        
    )
      }
}