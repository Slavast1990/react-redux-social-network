import React from 'react';
import classes from './Header.module.css';
import Bird from './../../assets/images/Bird.png'

const Header = () => {
  return <header className={classes.header}>
    <img src={Bird} />
  </header>;
}

export default Header;