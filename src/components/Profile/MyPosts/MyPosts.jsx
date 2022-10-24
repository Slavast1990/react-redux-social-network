import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import { MaxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

  let postsElements = props.posts.map(posts => <Post message={posts.message} likesCount={posts.likesCount} />)

  let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostReduxForm onSubmit={onAddPost} />
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>)
}

const maxLenght10 = MaxLengthCreator(10);

const AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
        <div>
          <Field name={"newPostText"} component={Textarea} placeholder={"Post message"}        
          validate={[required, maxLenght10]} />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
  
}

const AddNewPostReduxForm = reduxForm ({form: "ProfileAddNewPostForm"}) (AddNewPostForm)

export default MyPosts;