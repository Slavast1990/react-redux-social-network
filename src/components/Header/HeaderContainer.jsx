import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getAuthUserData, logout } from '../../redux/auth-reducer'
import { authAPI } from '../../api/api';


class HeaderContainer extends React.Component {
componentDidMount() {
  this.props.getAuthUserData();//шлем запрос getAuthUserData внутри него запрос me(кто мы такие?)
}


  render() {
    return <Header {...this.props} />
}
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  Login: state.auth.login,
})

export default connect(mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);