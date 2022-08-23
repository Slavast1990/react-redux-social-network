import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import { Switch, Route} from "react-router-dom";

const App = (props) => {

  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            {/* <Route path='/dialogs' component={Dialogs} />
            <Route path='/profile' component={Profile} /> */}

            <Route path='/dialogs' render={ () => <Dialogs state={props.state.dialogsPage} />} />
            <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage}
             addPost={props.addPost} 
             updateNewPostText={props.updateNewPostText} />} />
          </Switch>
        </div>
      </div>
  );
}


export default App;
