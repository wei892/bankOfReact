/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      creditBalance: 0,
      debitBalance: 0,
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addDebit = (newDebit) => {
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
    }));
    this.setState((prevState) => ({
      accountBalance: Math.round(prevState.accountBalance * 100) / 100 - Math.round(newDebit.amount * 100) / 100,
    }));
  }
  
  addCredit = (newCredit) => {
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
    }));
    this.setState((prevState) => ({
      accountBalance: Math.round(prevState.accountBalance * 100) /100 + Math.round(newCredit.amount * 100) / 100,
    }));
  }

  componentDidMount = () => {
    const creditsAPI = 'https://johnnylaicode.github.io/api/credits.json';
    const debitsAPI = 'https://johnnylaicode.github.io/api/debits.json';
    fetch(creditsAPI)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        data.map((credit) => {
          this.addCredit(credit);
        })
      })
      .catch((error) => {
        console.log("error");
      })

    fetch(debitsAPI)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((debit) => {
          this.addDebit(debit);
        })
      })
      .catch((error) => {
        console.log("error");
      })
  }
  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} balance={this.state.accountBalance} addBalance={this.addBalance}/>)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} balance={this.state.accountBalance} subtractBalance={this.subtractBalance}/>)
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    
    return (
      <Router basename="/bankOfReact">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;