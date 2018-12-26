import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, TextInput} from 'react-native';

const s = StyleSheet.create({
  expense: {
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
  },
  totals: {
    textAlign: "center"
  }
});

export default class Expense extends Component<prop>{
  update = (key, text)=>{
    if (!isNaN(Number(text))){
      text = Number(text);
    }
    this.props.updateValue('expenses', this.props.index, key, text);
  }
  render(){
    const expense = this.props.expense;
    const income = this.props.income;
    const finalValue = expense.value;
    return (
      <View style={[s.expense]}>
        <TextInput
        style={[s.input, s.bordered]}
        onChangeText={(text)=>{this.update('name', text)}}>
          {expense.name}
        </TextInput>
        <TextInput
        style={[s.input, s.bordered]}
        onChangeText={(text)=>{this.update('value', text)}}>
          {expense.value}
          </TextInput>
        <Text style={[s.input, s.totals]}>{`$${expense.finalValue.toFixed(2)}`}</Text>
      </View>
    )
  }
}
