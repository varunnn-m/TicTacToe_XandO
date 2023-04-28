import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import {responsiveHeight} from "react-native-responsive-dimensions"




const Icons = ({name}) => {

switch(name){
    case "circle":
    return <Icon name="circle-o" size={responsiveHeight(6.5)} color="#F7CD2E"/>
    break;

    case "cross":
    return <Icon name="times" size={responsiveHeight(6.5)} color="#38CC77"/>
    break;

    default:
    return <Icon name="plus-square" size={responsiveHeight(4.5)} color="#ADD8E670"/>
    break;

}

}

export default Icons