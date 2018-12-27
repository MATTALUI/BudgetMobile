import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity} from 'react-native';

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
    flex: 0.27
  },
  greyed: {
    backgroundColor: "rgb(248,248,248)"
  },
  mover:{
    flex: 0.1
  },
  grip: {
    borderRadius: 10,
    backgroundColor: 'rgb(230,230,230)',
    height: '100%'
  },
  totals: {
    textAlign: "center"
  }
});

export default class Expense extends Component<prop>{
  update = (key, text)=>{
    //TODO: do validations for acceptable formats
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
        <TouchableOpacity
        style={s.mover}
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}>
          <View style={s.grip}>
          </View>
        </TouchableOpacity>
        <TextInput
        placeholder="Expense"
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
