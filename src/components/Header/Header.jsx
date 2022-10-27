import React from 'react';
import classes from './Header.module.css';
import Bird from './../../assets/images/Bird.png'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  console.log(props)
  return <header className={classes.header}>
    <img src={Bird} />

    <div className={classes.loginBlock}>
      {props.isAuth ? <div> {props.Login} - <button onClick={props.logout}>Log out</button> </div>
       : <NavLink to={'/Login'}>Login</NavLink> }
    </div>
  </header>;
}

export default Header;