import "./styles.css";
import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { Post } from "../../Post";
import GlobalContext from '../../../context/globalContext';

export const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const globalState = useContext(GlobalContext);

    useEffect (() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {

          if (!user)
          {
              history.push('/login');
          }

        })}, []);

  useEffect(
    () => {
      getPosts();
    }, []
  );

  const getPosts = async() => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final-assignment/databases/(default)/documents/posts');
      const data = await response.json();

      const formattedData = data.documents.map( (item) => {
        return item.fields;
      });

      setPosts(formattedData);

      globalState.initializePosts(formattedData);

      setLoading(false);

    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="home-page">

      <div className="header-container">
        <h1 className="header"> ==== THE .JSX CAFÉ ==== </h1>
      </div>

      <div className="posts-container">
        {
          posts.map( (post) => (
            <Post username={post.username.stringValue} text={post.text.stringValue} ></Post>
          ))
        }

        {
          loading && <p>Loading Posts...</p>
        }

      </div>
    </div>
  );
};