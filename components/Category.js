import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';

const s = StyleSheet.create({
  category: {
    backgroundColor: '#000000'
  },
  categoryText: {
    color: "#ffffff",
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 3,
    marginBottom: 3
  }
});

export default class Category extends Component<prop>{
  render(){
    let category = this.props.category;
    return (
      <View style={[s.category]}>
        <TouchableOpacity
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}>
          <Text style={[s.categoryText]}>{category.category}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
