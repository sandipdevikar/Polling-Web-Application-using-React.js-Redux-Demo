import React, {useState,useEffect} from 'react';
import NavbarFun from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register'
import {Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert'
import store from './store';
import {loadUser} from "./actions/auth";
import Poll from './components/polls/Poll';
import Dashboard from './components/dashboard/Dashboard';
import Result from './components/results/Result';
import AdminAddPolls from './components/polls/AdminAddPolls';
import AdminPollsList from './components/polls/AdminPollsList';
import PollItem from './components/polls/PollItem';
import AddResult from './components/polls/AddResult';
import PrivateRoute from './routing/PrivateRoute';
import NavbarDemo from './NavbarDemo'
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  
  return (
    <Provider store={store}>
        <NavbarDemo/>
        <main style={{marginTop:'56px'}}>
      
        <Switch>
      <Route exact path="/" component={Landing}/>

    
        <Route exact path="/dashboard" component={Dashboard}/>

      <Route exact path="/polls" component={Poll}/>
      <Route exact path="/result" component={Result}/>
      <PrivateRoute exact path="/pollslist" component={AdminPollsList}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <PrivateRoute exact path='/addpolls' component={AdminAddPolls}/> 
      
      <Route exact path="/addResult" component={AddResult}/>
      <PrivateRoute exact path="/:id" component={PollItem}/>
      </Switch>
      </main>
    </Provider>
      
  );
}

export default App;
