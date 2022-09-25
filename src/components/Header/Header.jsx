import React from 'react';
import classes from './Header.module.css';
import Bird from './../../assets/images/Bird.png'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return <header className={classes.header}>
    <img src={Bird} />

    <div className={classes.loginBlock}>
      {props.isAuth ? props.Login
       : <NavLink to={'/Login'}>Login</NavLink> }
    </div>
  </header>;
}

export default Header;