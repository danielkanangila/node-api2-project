import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Main } from '../styled-components';
import Form from '../Form';
import PostCard from './PostCard';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const url = 'http://localhost:5000/api/posts';
        axios.get(url)
        .then(res => setPosts(res.data))
        .catch(err => console.log(err.response));
    });

    const updateState = (data) => {

    }

    return(
        <Main>
            <Form 
                updateState={updateState} 
                defaultState={{title: "", contents: ""}}
                from="posts" />
            {posts.map(post => <PostCard key={post.id} {...post} updateState={{}} deletePost={{}} />)}
        </Main>
    )
}

export default Posts;