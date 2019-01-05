import React, {Component} from 'react';
import {Modal, StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';

const s = StyleSheet.create({
  view: {
    flex: 0.95,
    marginTop: '25%'
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
  },
  marginalize: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  marginalizeSmall:{
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  bordered: {
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    flex: 0.27
  }
});


export default class SaveModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      budgetName: props.budgetName
    };
  }

  updateBudgetName=(budgetName)=>{
    this.setState({budgetName});
  }

  saveBudget = ()=>{
    this.props.saveBudget(this.state.budgetName);
  }

  render(){
    return (
      <Modal
      animationType="slide"
      style={[]}
      visible={this.props.show}
      onRequestClose={()=>{this.setState({showLoadModal: false})}}>
        <ScrollView style={[s.view]}>
          <TextInput
          style={[s.input, s.bordered, s.marginalize]}
          onChangeText={this.updateBudgetName}
          placeholder={"Budget Name"}>
            {this.props.budgetName}
          </TextInput>
          <TouchableOpacity
          onPress={this.saveBudget}
          style={[s.categoryButton, s.marginalizeSmall]}>
            <Text style={[s.whiteButtonText]}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
        style={[s.categoryButton, s.controllSlim]}
        onPress={this.props.toggleSaveModal}>
          <Text style={[s.whiteButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
