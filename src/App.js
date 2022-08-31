import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import { Switch, Route} from "react-router-dom";
import store from './redux/redux-store';

const App = (props) => {
debugger;
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            {/* <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} /> */}

            <Route path='/dialogs' render={ () => <Dialogs store={props.store} state={props.state.dialogsPage} />} />
            <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage}
             dispatch={props.dispatch} />} />
          </Switch>
        </div>
      </div>
  );
}


export default App;
