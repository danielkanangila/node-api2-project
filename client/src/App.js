import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

function App() {
  return (
    <div className="container app">
      <Route exact path="/" component={Posts} />
      <Route path="/posts/:id" component={Post} />
    </div>
  );
}

export default App;
