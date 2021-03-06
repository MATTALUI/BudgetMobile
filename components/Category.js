import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';

const s = StyleSheet.create({
  category: {
    backgroundColor: '#000000',
    marginTop: 10
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
  // shouldComponentUpdate = (nextProps, nextState)=>{
  //   return (this.props.category.category !== nextProps.category.category)
  // }

  toggleCategoryModal = ()=>{
    this.props.toggleCategoryModal(
      this.props.type,
      this.props.category.category,
      this.props.index
    )
  }

  render(){
    // let category = this.props.category;
    return (
      <View style={[s.category]}>
        <TouchableOpacity
        onPress={this.toggleCategoryModal}
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}>
          <Text style={[s.categoryText]}>
            {this.props.category.category}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
