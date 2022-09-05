import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import { Switch, Route} from "react-router-dom";
import store from './redux/redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            {/* <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} /> */}

            <Route path='/dialogs' render={ () => <DialogsContainer />} />
            <Route path='/profile' render={ () => <Profile />} />
          </Switch>
        </div>
      </div>
  );
}


export default App;
