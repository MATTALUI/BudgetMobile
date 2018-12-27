import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, Button, TouchableOpacity, Alert, AsyncStorage, FlatList} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Income from './components/Income.js';
import Expense from './components/Expense.js';
import Category from './components/Category.js';

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
    // for(let i =0; i<=(Math.random() *5);i++){
    // // for(let i =0; i<=20;i++){
    //   inc.push({name: "income "+i, value: 10*i});
    //   exp.push({name: "expense "+i, value: 5*i});
    // }
    // exp.push({name: "Mafia's Cut", value: "10%"});
    // exp.push({name: "Candy", value: "~3"});
    this.state = {
      user: {
        id: 1,
        firstName: "Matthew",
        lastName: "Hummer",
        username: "mattalui"
      },
      name: "Test Budget",
      datesaved: new Date().getTime(),
      incomes: inc,
      expenses: exp,
      loadableBudgets: [],
      authtoken: null,
      scrollEnabled: true
    };
  }

  componentWillMount(){
    // I had manually set @authtoken here
    AsyncStorage.getItem('@authtoken', (err, token)=>{
      this.setState({authtoken: token})
      fetch('http://10.37.0.112:8000/api/mobile/budgets', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization' : token,
          'Content-type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then((data)=>{
        this.setState({loadableBudgets: data});
      });
    });
  }

  confirmNewBudget = ()=>{
    Alert.alert(
      'New Budget',
      'If you create a new budget, all unsaved budget changes will be lost. Are you sure?',
      [
        {text: 'Yes', onPress: this.newBudget },
        {text: 'No'}
      ],
      { cancelable: false }
    )
  }

  newBudget = ()=>{
    this.setState({
      name: "New Budget",
      datesaved: null,
      incomes: [],
      expenses: []
    });
  }

  saveBudget = ()=>{
    //TODO: Save Budget to DB (or local?)
  }

  loadBudget = ()=>{
    //TODO: Load Budget  DB (or local?)
  }

  addIncome = ()=>{
    let copy = this.state.incomes.slice();
    copy.push({name: "", value: null});
    this.setState({incomes: copy});
  }

  addExpense = ()=>{
    let copy = this.state.expenses.slice();
    copy.push({name: "", value: null});
    this.setState({expenses: copy});
  }

  addCategory = (type)=>{
    let copy = this.state[type].slice();
    let data = {};
    copy.push({category: "Category", color: "#000000"});
    data[type] = copy;
    this.setState(data);
  }

  updateValue = (type, index, key, value)=>{
    let copy = this.state[type].slice();
    let data = {};
    copy[index][key] = value;
    data[type] = copy;
    this.setState(data);
  }

  test = ()=>{

  }

  renderIncome = ({item, index, move, moveEnd, isActive}) => {
    if(item.category){
      return (<Category key={"income-"+index} category={item} move={move} moveEnd={moveEnd}/>)
    }else{
      return (<Income key={"income-"+index} index={index} income={item} updateValue={this.updateValue} move={move} moveEnd={moveEnd}/>)
    }
  }

  renderExpense = ({item, index, move, moveEnd, isActive}) => {
    if(item.category){
      return (<Category key={"expense-"+index} category={item} move={move} moveEnd={moveEnd}/>)
    }else{
      return (<Expense key={"expense-"+index} index={index} expense={item} updateValue={this.updateValue} move={move} moveEnd={moveEnd}/>)
    }
  }

  render() {
    // TODO: BudgetMobile/node_modules/react-native-draggable-flatlist/index.js
    // There's a  issue with the DraggableFlatList component that doesn't
    // account for the offset of a scrollview, which makes nesting buggy
    // --------> Currently buggy is better than bothing. ¯\_(ツ)_/¯
    let userName = `${this.state.user.firstName} ${this.state.user.lastName}`;
    let incomes = this.state.incomes;
    let incomeTotal = incomes.reduce((acc, income)=>{
      if (income.category){
        return acc;
      }else{
        return acc + income.value;
      }
    },0);
    let expenseTotal = 0;
    let expenses = this.state.expenses.map((expense)=>{
      if (typeof expense.value === "string"){
        let val = expense.value;
        if(val[val.length-1] === "%"){
          let percent = (+val.slice(0,val.length-1))/100;
          expense.finalValue = incomeTotal*percent;
        }else if(val[0] === "~"){
          expense.finalValue = +(val.slice(1, val.length));
        }else{
          expense.finalValue = +(val);
        }
      }else if(!expense.value){
        expense.finalValue = 0;
      }else{
        expense.finalValue = expense.value;
      }
      expenseTotal += expense.finalValue;
      return expense;
    });
    let diff = incomeTotal - expenseTotal;
    let budgetStatus = (diff >= 0) ? "good" : "bad";
    // console.log(this.state);
    return (
      <View style={[styles.window]}>
        <View style={[styles.navbar]}>
          <Text style={[styles.whiteText]}>Budget Calculator</Text>
          <Text style={[styles.halfText]}>{userName}</Text>
        </View>
        <View style={[styles.main]}>
          <ScrollView scrollEnabled={this.state.scrollEnabled}>
            <View style={[styles.incexpcont]}>
              <Text style={[styles.heading]}>Incomes</Text>
              <View style={[styles.row]}>
                <TouchableOpacity style={[styles.categoryButton]} onPress={()=>{this.addCategory('incomes')}}>
                  <Text style={[styles.whiteButtonText]}>Add Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.incomeButton]} onPress={this.addIncome}>
                  <Text style={[styles.whiteButtonText]}>Add Income</Text>
                </TouchableOpacity>
              </View>
              <DraggableFlatList
              data={incomes}
              keyExtractor={(item, index) => ("income-"+index.toString())}
              renderItem={this.renderIncome}
              onMoveBegin={() => this.setState({ scrollEnabled: false })}
              onMoveEnd={({data})=>{this.setState({scrollEnabled: true, incomes: data})}}/>
              <View style={[styles.totalCont]}>
                <View style={[styles.third]}/>
                <View style={[styles.third]}/>
                <Text style={[styles.third, styles.total]}>{`$${incomeTotal.toFixed(2 )}`}</Text>
              </View>
            </View>
            <View style={[styles.incexpcont]}>
              <Text style={[styles.heading]}>Expenses</Text>
              <View style={[styles.row]}>
                <TouchableOpacity style={[styles.categoryButton]} onPress={()=>{this.addCategory('expenses')}}>
                  <Text style={[styles.whiteButtonText]}>Add Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.expenseButton]} onPress={this.addExpense}>
                  <Text style={[styles.whiteButtonText]}>Add Expense</Text>
                </TouchableOpacity>
              </View>
              <DraggableFlatList
              data={expenses}
              keyExtractor={(item, index) => ("expense-"+index.toString())}
              renderItem={this.renderExpense}
              onMoveBegin={() => this.setState({ scrollEnabled: false })}
              onMoveEnd={({data})=>{this.setState({scrollEnabled: true, expenses: data})}}/>
              {false && this.state.expenses.map((exp, i)=>{
                if(exp.category){
                  return (<Category key={i} category={exp}/>)
                }else{
                  return (<Expense key={i} index={i} expense={exp} updateValue={this.updateValue}/>)
                }
              })}
              <View style={[styles.totalCont]}>
                <View style={[styles.third]}/>
                <View style={[styles.third]}/>
                <Text style={[styles.third, styles.total]}>{`$${expenseTotal.toFixed(2)}`}</Text>
              </View>
            </View>
            <View style={[styles.totalCont]}>
              <View style={[styles.third]}/>
              <View style={[styles.third]}/>
              <Text style={[styles.third, styles.total, styles[budgetStatus]]}>{`$${diff.toFixed(2)}`}</Text>
            </View>

            {false && (<View><Text>DEBUG:</Text>
            <Text>{JSON.stringify(this.state.loadableBudgets)}</Text></View>)}
          </ScrollView>
        </View>
        <View style={[styles.footer]}>
          <TouchableOpacity style={[styles.controllButton]} onPress={this.confirmNewBudget}>
            <Text style={[styles.controllButtonText]}>New Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controllButton]}>
            <Text style={[styles.controllButtonText]}>Save Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controllButton]}>
            <Text style={[styles.controllButtonText]}>Load Budget</Text>
          </TouchableOpacity>
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
    flex: .1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  whiteText: {
    color: "#ffffff",
    fontSize: 20
  },
  halfText: {
    color: "rgba(255,255,255,.25)",
    fontSize: 20
  },
  incexpcont: {
    borderBottomWidth: 1
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: "#000000",
    fontWeight: 'bold'
  },
  controllButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    flex: .3,
    height: "75%",
    alignItems: "center",
    paddingTop: "3%"
  },
  controllButtonText: {
    textAlign: 'center',
    color: "#000",
    fontWeight: "bold"
  },
  totalCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 3,
    marginBottom: 2
  },
  total: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000"
  },
  third: {
    flex: 0.3
  },
  categoryButton: {
    color: "#fff",
    flex: 0.4,
    backgroundColor: "#000",
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10
  },
  incomeButton: {
    flex: 0.4,
    backgroundColor: "#28a745",
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10
  },
  expenseButton: {
    flex: 0.4,
    backgroundColor: "#dc3545",
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
  good: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  bad: {
    backgroundColor: "#dc3545",
    color: "#fff",
  }
});
