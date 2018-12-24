import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

export default class Expense extends Component<prop>{
  render(){
    let expense = this.props.expense;
    return (
      <Text>{expense.name}</Text>
    )
  }
}
