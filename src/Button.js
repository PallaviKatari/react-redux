// Button.js
import React, { useState } from 'react';
import axios from 'axios';

const Button = ({ label }) => {
  const [data, setData] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data); // array of 2 posts
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{label}</button>
      <ul data-testid="data">
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Button;
