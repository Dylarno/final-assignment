import React, {useState} from 'react';

const GlobalContext = React.createContext({
    posts: [],
    initializePosts: () => {},
});

export const GlobalContextProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const initializePosts = (postsFromApi) => {
      setPosts(postsFromApi);
    };

    return (<GlobalContext.Provider
     value={{ posts: posts, initializePosts: initializePosts }}
    >
        {props.children}
    </GlobalContext.Provider>)

}

export default GlobalContext;