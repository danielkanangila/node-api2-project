import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import { Main } from '../styled-components';
import PostCard from './PostCard';
import Comments from '../comments/Comments';

const API_URL = 'http://localhost:5000/api/posts';

const Post = () => {
    const [post, setPost] = useState({});
    const params = useParams();
    const history = useHistory();

   useEffect(() => {
        axios.get(`${API_URL}/${params.id}`)
        .then(res => setPost(res.data[0]))
        .catch(err => console.log(err.response));
   }, [])

    const updateState = (data) => {
        setPost(data);
    }

    const deletePost = (id) => {
        axios.delete(`${API_URL}/${id}`)
        .then(res => {
            if (res) {
                history.push('/')
            }
        })
        .catch(err => console.log(err.response));
    }

    return(
        <Main>
            <PostCard 
                {...post} updateState={updateState} 
                deletePost={deletePost} />
            <div className="mt-30"></div>
            <Comments postId={post.id} />
        </Main>
    )

}

export default Post;
