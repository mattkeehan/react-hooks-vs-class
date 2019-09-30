import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [hasError, setErrors] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      axios.get(`http://www.reddit.com/r/reactjs.json`)
      .then(response => {
        setPosts(response.data.data.children.map(obj => obj.data));
      })
      .catch(function (error) {
        setErrors({error});
      });
    }
    fetchData();
  }, false);

  return (
    <div>
      {hasError && (
        <span>{hasError.error.message}</span>
      )}
      {!posts && (
        <span>loading...</span>
      )}
      <ul>
        {posts && posts.map((post, index) => {
            return <li key={index}>{post.title}</li>
          })}
      </ul>
    </div>
  );
};
export default App;
