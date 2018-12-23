/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

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
    for(let i =0; i<=(Math.random() *20);i++){
      inc.push({name: "inc-"+i});
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
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>POOP</Text>
      //   <Text style={styles.instructions}>Yeah I poop my pants. What of it?</Text>
      // </View>
      <View>
        <View style={[styles.navbar]}>
          <Text style={[styles.whiteText]}>Budget Calculator</Text>
          <Text style={[styles.halfText]}>{name}</Text>
        </View>
        <ScrollView>
          {this.state.incomes.map((inc, i)=>(
            <Text key = {i} style={[styles.test]}>{inc.name}</Text>
          ))}
          {this.state.expenses.map((exp, i)=>(
            <Text key = {i} style={[styles.test]}>{exp.name}</Text>
          ))}
        </ScrollView>
        <View style={[styles.footer]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#343a40",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footer: {
    backgroundColor: "#343140",
    height: 10
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
