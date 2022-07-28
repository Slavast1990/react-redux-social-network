import React from 'react';
import classes from './Navbar.module.css';
console.log(classes);

// let classes = {
//  'nav': .Navbar_nav__kzJbI,
// 'item': .Navbar_item__J0rHl,
// 'active': 'какое то значение'
//}

// let c1 = "item";
// let c2 = "active";
// let classes = "item active";
// // "item active"
// let classes = c1 + " " + c2;
// Let classesNew = `${classes.item} ${classes.active}`;

const Navbar = () => {
    return  <nav className={classes.nav}>
    <div className={classes.item}>
      <a>Profile</a>
    </div>
    <div className={`${classes.item} ${classes.active}`}>
      <a>Messages</a>
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
  </nav>;
}

export default Navbar;