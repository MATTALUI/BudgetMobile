import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const s = StyleSheet.create({
  load: {
  },
  white: {
    backgroundColor: "#fff"
  },
  grey: {
    backgroundColor: "rgb(220,220,220)"
  },
  name: {
    color: "#000",
    fontWeight: 'bold',
    fontSize: 30
  },
  center: {
    textAlign: 'center'
  },
  third: {
    flex: 0.3
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5
  },
  good: {
    backgroundColor: "#28a745",
    borderRadius: 10
  },
  bad: {
    backgroundColor: "#dc3545",
    borderRadius: 10
  },
  controlText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  date: {
    marginBottom: 10
  }
});

export default class Load extends Component{
  render(){
    const load = this.props.load;
    return (
      <View style={[s[this.props.stripe], s.load]}>
        <Text style={[s.name, s.center]}>{load.name}</Text>
        <Text style={[s.center, s.date]}>Saved {new Date(+load.dateSaved).toDateString()}</Text>
        <View style={[s.controls]}>
          <TouchableOpacity style={[s.third, s.bad]}>
            <Text style={[s.controlText]}>Delete Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.third, s.good]} onPress={()=>{this.props.loadBudget(load.id)}}>
            <Text style={[s.controlText]}>Load Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
