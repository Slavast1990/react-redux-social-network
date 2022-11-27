import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto}
        IsOwner={props.IsOwner}
        profile={props.profile}
        status={props.status}
        SaveProfile={props.SaveProfile}
        updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>)
}

export default Profile;