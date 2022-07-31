import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  
  return (
    <div className={classes.item}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GRnDEllqSKYI4SzrGgy4p7LoVKhsZxdsZQ&usqp=CAU' />
      {props.message}
      <div>
      <span>like</span>
      </div>
    </div>)
}

export default Post;