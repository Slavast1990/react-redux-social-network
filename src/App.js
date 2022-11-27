import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Switch, Route, withRouter} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer'
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));//мы говорим что в bundle(большой) DialogsContainer не попадает - загружается 'лениво'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));//мы говорим что в bundle(большой) ProfileContainer не попадает - загружается 'лениво'
// при использовании React.lazy для некоторых контейнерных компонент (которые тянут за собой много других компонент) App загружается у нас быстрее

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
            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/users' render={ () => <UsersContainer />} />
            <Route path='/Login' render={ () => <Login />} />
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
 return <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
}

export default SamuraiJSApp;