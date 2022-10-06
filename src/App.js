import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route} from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route path='/dialogs' render={ () => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
            <Route path='/users' render={ () => <UsersContainer />} />
            <Route path='/Login' render={ () => <Login />} />
          </Switch>
        </div>
      </div>
  );
}


export default App;
