import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Main } from '../styled-components';
import PostCard from './PostCard';
import Comments from '../comments/Comments';

const Post = () => {
    const [post, setPost] = useState({});
    const params = useParams();

   useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${params.id}`)
        .then(res => setPost(res.data[0]))
        .catch(err => console.log(err.response));
   }, [])

    const updateState = (data) => {

    }

    const deletePost = (id) => {

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
