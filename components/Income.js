import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ScrollView, View} from 'react-native';

const s = StyleSheet.create({
  income: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 3,
    marginBottom: 2
  },
  bordered: {
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    flex: 0.3
  }
});

export default class Income extends Component<prop>{
  render(){
    let income = this.props.income;
    return (
      <View style={[s.income]}>
        <TextInput placeholder="SOURCE" style={[s.input, s.bordered]}>{income.name}</TextInput>
        <TextInput style={[s.input, s.bordered]}>{income.value}</TextInput>
        <Text style={[s.input]}></Text>
      </View>
    )
  }
}
