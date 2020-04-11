import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Main } from '../styled-components';
import Form from '../Form';
import PostCard from './PostCard';

const API_URL = 'http://localhost:5000/api/posts';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get(API_URL)
        .then(res => setPosts(res.data))
        .catch(err => console.log(err.response));
    });

    const updateState = (data) => {

    }

    return(
        <Main>
            <PostForm 
                updateState={setPosts}  />
            {posts.map((post, index) => <PostCard key={index} {...post} updateState={null} deletePost={null} />)}
        </Main>
    )
}

const PostForm = ({updateState}) => {
    const __default = {
        title: '',
        contents: ''
    }
    const [state, setState] = useState(__default);
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value 
        })
    }
    const reset = (e) => {
        if (e) e.preventDefault();
        setState(__default)
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post(API_URL, state)
        .then(res => {
            updateState(state => [...state, res.data[0]])
        })
        .catch(err => console.log(err.response));
        reset()
    } 
    return(
        <form onSubmit={handleSubmit}>
            <h2>Add new post</h2>
            <div className="field mb-20">
                <input 
                    onChange={handleChange} 
                    type="text" 
                    name="contents"
                    value={state.contents} />
                <label>Title</label>
            </div>
            <div className="field">
                <textarea 
                    onChange={handleChange} 
                    name="title" 
                    value={state.title}>    
                </textarea>
                <label>Content</label>
            </div>
            <div className="action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button onClick={reset} type="reset" className="btn btn-default">Cancel</button>
            </div>
        </form>
    )
}

export default Posts;