import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route, withRouter} from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();//шлем запрос getAuthUserData внутри него запрос me(кто мы такие?)
  }
  render(){
    if (!this.props.initialized){
    return <Preloader />
    }//если не проинициализировались верни Preloader
  
    return (//если инициализация прошла покажи все остальное
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
  )}
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose (
  withRouter, 
    connect(mapStateToProps, {initializeApp})) (App);