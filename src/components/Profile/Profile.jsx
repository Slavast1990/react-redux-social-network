import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';

const Profile = (props) => {
  debugger;
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer />
    </div>)
}

export default Profile;