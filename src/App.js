import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route, withRouter} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer'
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();//шлем запрос getAuthUserData внутри него запрос me(кто мы такие?)
  }
  render() {
    if (!this.props.initialized){  //если мы не проинициализировались
    return <Preloader />
    }
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
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized//получим знание проинициилизированы мы или нет
})


let AppContainer = compose (
  withRouter,
  connect(mapStateToProps, {initializeApp})) (App);

 const SamuraiJSApp = (props) => {
 return <Router>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Router>
}

export default SamuraiJSApp;