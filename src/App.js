import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
