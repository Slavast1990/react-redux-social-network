import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
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

  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");//когда ошибка вызывается alert (обработчик ошибок)
  }

  componentDidMount() {
    this.props.initializeApp();//шлем запрос getAuthUserData внутри него запрос me(кто мы такие?)
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);//когда у window произойдет событие - не перехваченый код ошибки - перехвати его(вызови метод catchAllUnhandledErrors) 
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);//!если мы делаем addEventListener(componentDidMount) то обязательно делаем removeEventListener(componentWillUnmount)!
  }

  render() {
    if (!this.props.initialized) {  //если мы не проинициализировались
      return <Preloader />
    }
    return (

      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />//если путь совпадает точь в точь редирект на профайл(чтоб первая страница была профайл)
            } />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/Login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>//если не один из URL не удовлетворится покажется фейковый URL (берет последний)(звездочка не в одном из URL не используется) 
            } />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized//получим знание проинициилизированы мы или нет
})


let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;