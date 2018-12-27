import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
  }
});

export default class Income extends Component<prop>{
  update = (key, text)=>{
    //TODO: do validations for acceptable formats
    if (!isNaN(Number(text))){
      text = Number(text);
    }
    this.props.updateValue('incomes', this.props.index, key, text);
  }

  render(){
    const income = this.props.income;
    return (
      <View style={[s.income]}>
        <TouchableOpacity
        style={s.mover}
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}>
          <View style={s.grip}>
          </View>
        </TouchableOpacity>
        <TextInput
        placeholder="SOURCE"
        style={[s.input, s.bordered, s.greyed]}
        onChangeText={(text)=>{this.update('name', text)}}>
          {income.name}
        </TextInput>
        <TextInput
        style={[s.input, s.bordered, s.greyed]} onChangeText={(text)=>{this.update('value', text)}}>
          {income.value}
        </TextInput>
        <Text style={[s.input]}></Text>
      </View>
    )
  }
}
