import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from  './components/layours/Navbar';
import './App.css';
// import Home from './components/home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NewRequest from "./components/reimbursement/newRequest";
import RecordList from "./components/reimbursement/reimburseList/reimburseList";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        
          <Navbar />
          <Switch>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/addnew' component={NewRequest}/>
            <Route path='/' component = {RecordList}/>
          </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
