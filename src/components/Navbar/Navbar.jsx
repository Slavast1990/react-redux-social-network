import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
console.log(classes);

const Navbar = () => {
    return (
    <nav className={classes.nav}>
    <div className={classes.item}>
      <NavLink to='/profile' activeClassName={classes.activelink}>Profile</NavLink>
    </div>
    <div className={`${classes.item} ${classes.activelink}`}>
      <NavLink to='/dialogs' activeClassName={classes.activelink}>Messages</NavLink>
    </div>
    <div className={classes.item}>
      <a>News</a>
    </div>
    <div className={classes.item}>
      <a>Music</a>
    </div>
    <div className={classes.item}>
      <a>Settings</a>
    </div>
  </nav>
)
}

export default Navbar;