import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUserData } from '../../redux/auth-reducer'


class HeaderContainer extends React.Component {
componentDidMount() {
  axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { 
    withCredentials: true 
}
  )
  .then(Response => {
    if (Response.data.resultCode === 0) {
      let {id, Login, email} = Response.data.data;
      this.props.setAuthUserData( id, email, Login );
    }
});
}


  render() {
    return <Header {...this.props} />
}
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  Login: state.auth.Login,
})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);