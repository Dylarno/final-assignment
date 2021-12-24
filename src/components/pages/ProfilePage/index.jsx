import "./styles.css";
import { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { Post } from "../../Post";

import GlobalContext from '../../../context/globalContext';

export const ProfilePage = () => {

  const globalState = useContext(GlobalContext);

  const [posts, setPosts] = useState(globalState.posts);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const auth = getAuth();
  const loggedInUser = auth.currentUser.email;

    

  useEffect(() => {
      filterPosts();
  }, [globalState]);

  const filterPosts = () => {

      const loggedInUserPosts = globalState.posts.filter(
          (post) => {
              const username = post.username.stringValue.toLowerCase();
              const isMatch = username.indexOf(loggedInUser.trim().toLowerCase());

              return isMatch !== -1;
          }
      )

      setPosts(loggedInUserPosts);

  }
     
  const sendNewPost = async(formVals) => {

    const newPost = {fields: {username: {stringValue: loggedInUser}, text: {stringValue: formVals.text},}}
 
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final-assignment/databases/(default)/documents/posts',
      {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(newPost)
      });
 
      history.push('/');
 
  }

  return (
    <div className="home-page">

      <div className="header-container">
        <h1 className="header-profile"> {loggedInUser}'s Table </h1>
      </div>

      <div className="new-post-container">
        <form className="profile-form" onSubmit={handleSubmit(sendNewPost)}>

          <h2 className="add-post-text">Add a New Post</h2>

            <div className="new-post">
              <textarea className="new-post-text" type="text" rows="5" cols="50" name="text" required {...register('text')} />
            </div>

          <input className="send-post" type="submit" value="Post"></input>
      </form>
    </div>

      <div className="posts-container">
        {
          posts.map( (post) => (
            <Post username={post.username.stringValue} text={post.text.stringValue} ></Post>
          )).reverse()
        }

      </div>
    </div>
  );
};