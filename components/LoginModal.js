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


export default class LoginModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: null,
      password: null,
      error: null
    };
  }

  updateUsername = (username)=>{
    this.setState({username});
  }

  updatePassword = (password)=>{
    this.setState({password});
  }

  login = ()=>{
    let credentials = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(credentials);
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
          onChangeText={(text)=>{this.updateUsername(text)}}
          style={[s.bordered, s.input, s.greyed, s.marginalize]} placeholder={"Username"}/>
          <TextInput
          onChangeText={(text)=>{this.updatePassword(text)}}
          style={[s.bordered, s.input, s.greyed, s.marginalize]}
          placeholder={"Password"}
          secureTextEntry={true}/>
          <TouchableOpacity
          onPress={this.login}
          style={[s.categoryButton, s.marginalizeSmall]}>
            <Text style={[s.whiteButtonText]}>Log In</Text>
          </TouchableOpacity>
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
