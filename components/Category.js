import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

const s = StyleSheet.create({
  category: {
    backgroundColor: '#000000'
  },
  categoryText: {
    color: "#ffffff",
    textAlign: 'center'
  }
});

export default class Category extends Component<prop>{
  render(){
    let category = this.props.category;
    return (
      <View style={[s.category]}>
        <Text style={[s.categoryText]}>{category.category}</Text>
      </View>
    )
  }
}
