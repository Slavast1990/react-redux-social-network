import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer'
import { Redirect, withRouter } from 'react-router-dom';
import { usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

componentDidMount () {
  let userId = this.props.match.params.userId;
  console.log(this.props.match)
  if (!userId) {
    userId = this.props.authorizedUserId;//берем из props наши аутификационные данные
  }
this.props.getUserProfile (userId);
  this.props.getStatus (userId);
}

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateStatus}/>
      </div>)
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,//userId берем из веточки auth (authReducer)
  isAuth: state.auth.isAuth
  });
 
export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus} ),
  withRouter,
  // withAuthRedirect
) (ProfileContainer);





