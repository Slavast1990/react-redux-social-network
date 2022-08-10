import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = (props) => {

  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            {/* <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} /> */}

            <Route path='/dialogs' render={ () => <Dialogs state={props.state.dialogsPage} />} />
            <Route path='/profile' render={ () => <Profile state={props.state.profilePage} />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
