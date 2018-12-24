/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';
import Income from './components/Income.js';
import Expense from './components/Expense.js';

/*
Budget:
  [Income]
  [Expense]
  "name"
  #datesaved
  "type" (only if local v db loads)
Income:
  "name"
  #value
Expense:
  "name"
  #value/"value"
Category << Income/Expense:
  "category"
  "color"
*/

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    //dummy data for now
    let inc =[];
    let exp =[];
    // for(let i =0; i<=(Math.random() *20);i++){
    for(let i =0; i<=20;i++){
      inc.push({name: "inc-"+i, value: 10*i});
      exp.push({name: "exp-"+i});
    }
    this.state = {
      user: {
        id: 1,
        firstName: "Matthew",
        lastName: "Hummer",
        username: "mattalui"
      },
      incomes: inc,
      expenses: exp
    };
  }
  render() {
    let name = `${this.state.user.firstName} ${this.state.user.lastName}`
    return (
      <View style={[styles.window]}>
        <View style={[styles.navbar]}>
          <Text style={[styles.whiteText]}>Budget Calculator</Text>
          <Text style={[styles.halfText]}>{name}</Text>
        </View>
        <View style={[styles.main]}>
          <ScrollView>
            {this.state.incomes.map((inc, i)=>(
              <Income key={i} income={inc}/>
            ))}
            {this.state.expenses.map((exp, i)=>(
              <Expense key={i} expense ={exp}/>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.footer]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    flex: 1
  },
  navbar: {
    backgroundColor: "#343a40",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: .05
  },
  main: {
    flex: .85
  },
  footer: {
    backgroundColor: "#343140",
    // height: 10,
    flex: .1
  },
  whiteText: {
    color: "#ffffff",
    fontSize: 20
  },
  halfText: {
    color: "rgba(255,255,255,.25)",
    fontSize: 20
  },
  test: {
    fontSize: 40
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
