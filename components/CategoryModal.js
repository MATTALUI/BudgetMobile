import React, {Component} from 'react';
import {Modal, StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';

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
  },
  greyed: {
    backgroundColor: "rgb(248,248,248)"
  },
});


export default class CategoryModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      categoryText: props.category
    };
  }

  updateCategoryText = (text)=>{
    this.setState({
      categoryText: text
    });
  }

  updateCategory = ()=>{
    // console.log(this.props);
    this.props.updateCategory(this.props.categoryType, this.props.categoryIndex, this.state.categoryText);
    this.setState({
      categoryText: this.props.state
    });
  }

  render(){
    return (
      <Modal
      animationType="slide"
      style={[]}
      visible={this.props.show}
      onRequestClose={()=>{}}>
        <ScrollView style={[s.loadView]}>
          <TextInput
          onChangeText={this.updateCategoryText}
          style={[s.bordered, s.input, s.greyed, s.marginalize]} placeholder={"Category Name"}>
            {this.props.category}
          </TextInput>
          <TouchableOpacity
          onPress={this.updateCategory}
          style={[s.categoryButton, s.marginalizeSmall]}>
            <Text style={[s.whiteButtonText]}>Change</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
        style={[s.categoryButton, s.controllSlim]}
        onPress={this.props.toggleCategoryModal}>
          <Text style={[s.whiteButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
