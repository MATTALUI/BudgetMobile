import React, {Component} from 'react';
import {Modal, StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity} from 'react-native';

const s = StyleSheet.create({
  view: {
    flex: 0.95
  },
  categoryButton: {
    color: "#fff",
    flex: 0.4,
    backgroundColor: "#000",
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10
  },
  whiteButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  controllSlim:{
    flex: 0.05
  }
});


export default class LoginModal extends Component{
  render(){
    return (
      <Modal
      animationType="slide"
      style={[]}
      visible={this.props.show}
      onRequestClose={()=>{this.setState({showLoadModal: false})}}>
        <ScrollView style={[s.view]}>
        </ScrollView>
        <TouchableOpacity
        style={[s.categoryButton, s.controllSlim]}
        onPress={this.props.toggleLoginModal}>
          <Text style={[s.whiteButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
