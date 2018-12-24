import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

export default class Income extends Component<prop>{
  render(){
    let income = this.props.income;
    return (
      <Text>{income.name}</Text>
    )
  }
}
