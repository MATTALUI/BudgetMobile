import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, Button, TouchableOpacity, Alert, AsyncStorage, FlatList, Modal} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Income from './components/Income.js';
import Expense from './components/Expense.js';
import Category from './components/Category.js';
import LoadModal from './components/LoadModal.js';
import LoginModal from './components/LoginModal.js';
import SaveModal from './components/SaveModal.js';
import CategoryModal from './components/CategoryModal.js';

/*
Budget:
  [Income/Category]
  [Expense/Category]
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
    global.host = "10.0.0.119:8000";
    super(props);
    let inc =[];
    let exp =[];
    // dummy data for now
    for (let i =0; i<=(Math.random() *5);i++) {
      inc.push({name: "income "+i, value: 10*i});
      exp.push({name: "expense "+i, value: 5*i});
    }
    exp.push({name: "Mafia's Cut", value: "10%"});
    exp.push({name: "Candy", value: "~3"});
    this.state = {
      // user info
      userId: null,
      name: null,
      username: null,
      authtoken: null,
      // budget info
      budgetId: null,
      budgetName: "New Budget",
      datesaved: null,
      incomes: inc,
      expenses: exp,
      // app state
      loadableBudgets: [],
      scrollEnabled: true,
      showLoadModal: false,
      showLoginModal: false,
      showSaveModal: false,
      loadedBudget: false,
      // category info
      showCategoryModal: false,
      categoryType: null,
      category: null,
      categoryIndex: null
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('@userid', (err, userId)=>{
      this.setState({userId});
    });
    AsyncStorage.getItem('@username', (err, username)=>{
      this.setState({username});
    });
    AsyncStorage.getItem('@name', (err, name)=>{
      this.setState({name});
    });
    AsyncStorage.getItem('@authtoken', (err, token)=>{
      this.setState({authtoken: token})
      this.fetchBudgets(token);
    });
  }

  fetchBudgets=(token=null)=>{
    if(!token){ token = this.state.authtoken; }
    if(!token){ return; }
    fetch(`http://${global.host}/api/mobile/budgets`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization' : token,
        'Content-type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      data = data.sort((a, b)=>{return b.dateSaved-a.dateSaved});
      this.setState({loadableBudgets: data});
    });
  }

  checkLoggedIn = ()=>{
    return (
      this.state.userId    &&
      this.state.username  &&
      this.state.name      &&
      this.state.authtoken
    )
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
      budgetId: null,
      name: "New Budget",
      datesaved: null,
      incomes: [],
      expenses: [],
      loadedBudget: false
    });
  }

  saveBudget = (budgetName)=>{
    let budget = {
      budgetName: budgetName,
      dateSaved: Date.now(),
      incomes: this.state.incomes,
      expenses: this.state.expenses
    }
    fetch(`http://${global.host}/api/mobile/budgets`, {
      method: 'POST',
      body: JSON.stringify(budget),
      headers: {
        'Accept': 'application/json',
        'Authorization' : this.state.authtoken,
        'Content-type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then((budget)=>{
      if(budget.error){ return; }
      budget = budget[0];
      let loadableBudgets = this.state.loadableBudgets.slice();
      loadableBudgets.unshift(budget);
      this.setState({
        budgetId: budget.id,
        budgetName: budget.name,
        incomes: budget.incomes,
        expenses: budget.expenses,
        datesaved: budget.dateSaved,
        loadedBudget: true,
        showSaveModal: false,
        loadableBudgets: loadableBudgets
      });
    });
  }

  loadBudget = (budgetId)=>{
    let budget = this.state.loadableBudgets.find(budget=>(budget.id === budgetId));
    this.setState({
      budgetId: budget.id,
      budgetName: budget.name,
      datesaved: +(budget.dateSaved),
      incomes: budget.incomes,
      expenses: budget.expenses,
      showLoadModal: false,
      loadedBudget: true
    });
  }

  deleteBudget = (budgetId)=>{
    Alert.alert(
      'Delete Budget',
      'This will permanantly delete this budget. Are you sure?',
      [
        {text: 'Yes', onPress: ()=>{
          let deletedBudget = this.state.loadableBudgets.find((b)=>(b.id===budgetId));
          fetch(`http://${global.host}/api/mobile/budgets`,{
            method: "DELETE",
            body: JSON.stringify({
              name: deletedBudget.name
            }),
            headers: {
              'Content-type': 'Application/json',
              'Accept': 'application/json',
              'Authorization' : this.state.authtoken
            }
          })
          .then(res=>res.json())
          .then((deletedBudget)=>{
            let loadableBudgets = this.state.loadableBudgets.slice();
            loadableBudgets = loadableBudgets.filter((b)=>(b.id!==budgetId));
            this.setState({loadableBudgets});
          });
        } },
        {text: 'No'}
      ],
      { cancelable: false }
    )
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

  toggleLoadModal = ()=>{
    this.setState({showLoadModal: !this.state.showLoadModal});
  }

  toggleLoginModal = ()=>{
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  toggleSaveModal = ()=>{
    this.setState({showSaveModal: !this.state.showSaveModal});
  }

  toggleCategoryModal = (type, category, index)=>{
    if(this.state.showCategoryModal){
      this.setState({
        showCategoryModal: false,
        categoryType: null,
        category: null,
        categoryIndex: null
      });
    }else{
      this.setState({
        showCategoryModal: true,
        categoryType: type,
        category: category,
        categoryIndex: index
      });
    }
  }

  updateCategory = (type, index, name)=>{
    let copy = this.state[type].slice();
    let data = {};
    copy[index].category = name;
    data[type] = copy;
    console.log(data);
    this.setState(data,()=>{
      this.toggleCategoryModal();
    });

  }

  login = (credentials)=>{
    fetch(`http://${global.host}/api/mobile/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'Application/json'
      }
    })
    .then(resp=>resp.json())
    .then((user)=>{
      let name = `${user.firstName} ${user.lastName}`;
      AsyncStorage.setItem('@userid', `${user.id}`)
      AsyncStorage.setItem('@name', name);
      AsyncStorage.setItem('@username', user.username);
      AsyncStorage.setItem('@authtoken', user.authtoken);
      this.setState({
        userId: user.id,
        name: name,
        username: user.username,
        authtoken: user.authtoken,
        showLoginModal: false
      })
      this.fetchBudgets(user.authtoken);
    });
  }

  logout = ()=>{
    AsyncStorage.removeItem('@userid');
    AsyncStorage.removeItem('@name');
    AsyncStorage.removeItem('@username');
    AsyncStorage.removeItem('@authtoken');
    this.setState({
      userId: null,
      name: null,
      username: null,
      authtoken: null,
      loadableBudgets: []
    });
  }

  renderIncome = ({item, index, move, moveEnd, isActive}) => {
    if(item.category){
      return (
        <Category
        key={"income-"+index}
        index={index}
        type={"incomes"}
        toggleCategoryModal={this.toggleCategoryModal}
        category={item}
        move={move}
        moveEnd={moveEnd}/>
      )
    }else{
      return (<Income key={"income-"+index} index={index} income={item} updateValue={this.updateValue} move={move} moveEnd={moveEnd}/>)
    }
  }

  renderExpense = ({item, index, move, moveEnd, isActive}) => {
    if(item.category){
      return (
        <Category
        key={"expense-"+index}
        index={index}
        type={"expenses"}
        toggleCategoryModal={this.toggleCategoryModal}
        category={item}
        move={move}
        moveEnd={moveEnd}/>)
    }else{
      return (<Expense key={"expense-"+index} index={index} expense={item} updateValue={this.updateValue} move={move} moveEnd={moveEnd}/>)
    }
  }

  render() {
    // TODO: BudgetMobile/node_modules/react-native-draggable-flatlist/index.js
    // There's a  issue with the DraggableFlatList component that doesn't
    // account for the offset of a scrollview, which makes nesting buggy
    // --------> Currently buggy is better than nothing. ¯\_(ツ)_/¯
    let name = this.state.name;
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
    return (
      <View style={[styles.window]}>
        <View style={[styles.navbar]}>
          <Text style={[styles.whiteText]}>Budget Calculator</Text>
          {this.checkLoggedIn() ? (
            <TouchableOpacity onLongPress={this.logout}>
              <Text style={[styles.halfText]}>{name}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleLoginModal}>
              <Text style={[styles.halfText]}>Log In</Text>
            </TouchableOpacity>
          )
          }
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


          <LoadModal
          show={this.state.showLoadModal}
          loads ={this.state.loadableBudgets}
          toggleLoadModal={this.toggleLoadModal}
          loadBudget={this.loadBudget}
          deleteBudget={this.deleteBudget}/>

          <LoginModal
          login = {this.login}
          show={this.state.showLoginModal}
          toggleLoginModal={this.toggleLoginModal}/>

          <SaveModal
          budgetId={this.state.budgetId}
          budgetName={this.state.budgetName}
          show={this.state.showSaveModal}
          toggleSaveModal={this.toggleSaveModal}
          saveBudget={this.saveBudget}/>

          <CategoryModal
          show={this.state.showCategoryModal}
          toggleCategoryModal={this.toggleCategoryModal}
          updateCategory={this.updateCategory}
          categoryType={this.state.categoryType}
          category={this.state.category}
          categoryIndex={this.state.categoryIndex}/>


        </View>
        <View style={[styles.footer]}>
          <TouchableOpacity style={[styles.controlButton]} onPress={this.confirmNewBudget}>
            <Text style={[styles.controlButtonText]}>New Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={this.checkLoggedIn() ? [styles.controlButton] : [styles.controlButton, styles.disabled]}
          onPress={this.toggleSaveModal}
          disabled={!this.checkLoggedIn()}>
            <Text style={this.checkLoggedIn() ? [styles.controlButtonText] : [styles.controlButtonText, styles.disabledText] }>Save Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.checkLoggedIn() ? [styles.controlButton] : [styles.controlButton, styles.disabled]} onPress={this.toggleLoadModal}>
            <Text style={this.checkLoggedIn() ? [styles.controlButtonText] : [styles.controlButtonText, styles.disabledText] }>Load Budget</Text>
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
  controlButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    flex: .3,
    height: "75%",
    alignItems: "center",
    paddingTop: "3%"
  },
  controlButtonText: {
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
  },
  disabled: {
    backgroundColor: "#343a40"
  },
  disabledText: {
    color: "#ccc"
  }
});
