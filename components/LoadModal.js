import React, {Component} from 'react';
import {Modal, StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity} from 'react-native';
import Load from './Load.js';

const s = StyleSheet.create({
  loadHead:{
    flexDirection: 'row'
  },
  loadHeadText:{
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000'
  },
  third: {
    flex: 0.3
  },
  quarter: {
    flex: 0.25,
    backgroundColor: 'pink'
  },
  loadView: {
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
  name: {
    color: "#000",
    fontWeight: 'bold',
    fontSize: 30
  },
  center: {
    textAlign: 'center'
  }
});


export default class LoadModal extends Component{
  renderLoad = ({item, index})=>{
    let stripe = index%2===0 ? "white" : "grey"
    return (
      <Load
      key={"load-"+index}
      load={item}
      stripe={stripe}
      loadBudget={this.props.loadBudget}/>
    )
  }

  render(){
    return (
      <Modal
      animationType="slide"
      style={[]}
      visible={this.props.show}
      onRequestClose={()=>{this.setState({showLoadModal: false})}}>
        <ScrollView style={[s.loadView]}>
          {!this.props.loads.length && (
            <Text style={[s.name, s.center]}>No Saved Budgets</Text>
          )}
          <FlatList
          data={this.props.loads}
          renderItem={this.renderLoad}
          keyExtractor={(item, index) => ("load-"+index.toString())}/>
        </ScrollView>
        <TouchableOpacity
        style={[s.categoryButton, s.controllSlim]}
        onPress={this.props.toggleLoadModal}>
          <Text style={[s.whiteButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
