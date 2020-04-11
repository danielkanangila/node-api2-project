import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form = ({defaultState, updateState, from}) => {
    const [newPost, setNewPost] = useState(defaultState);
    const [formTitle, setFormTitle] = useState('Add new post')
    const API_URL = 'http://localhost:5000/api/posts';
    const params = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        setNewPost(defaultState);   
        switch(from) {
            case 'post':
                setFormTitle('Edit');
                break;
            case 'comments':
                setFormTitle('Add comments');
                break;
            default:
        }
        return function cleanup() {
            abortController.abort()
        };
    }, [defaultState, from])

    const handleChange = e => {
        if (e.target.name === 'title') textareaAutosize(e.target);
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const textareaAutosize = (el) => {
        setTimeout(() => {
            el.style.cssText = `height: ${el.scrollHeight}px`
        }, 0)
    }

    const reset = e => {
        if (e) e.preventDefault();
        if (from === 'post') updateState({reset: true})
        Object.keys(newPost).forEach(key => {
            setNewPost({
                ...newPost,
                [key]: ''
            });
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const isEdit = from === 'post';
        const url = isEdit ? `${API_URL}/${newPost.id}` : `${API_URL}/${params.id}/comments`;
        const method = isEdit ? 'put' : 'post';
        const data = isEdit ? newPost : {text: newPost.title};
        axios[method](url, data)
        .then(res => {
            updateState(res.data);
            reset()
        })
        .catch(err => console.log(err));
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>{formTitle}</h2>
            {from !== 'comments' && 
                <div className="field mb-20">
                    <input 
                        onChange={handleChange} 
                        type="text" 
                        name="contents"
                        value={newPost.contents} />
                    <label>Title</label>
                </div>
            }
            <div className="field">
                <textarea 
                    onChange={handleChange} 
                    name="title" 
                    value={newPost.title}>    
                </textarea>
                <label>{from === 'comments' ? 'Comment' : 'Content'}</label>
            </div>
            <div className="action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button onClick={reset} type="reset" className="btn btn-default">Cancel</button>
            </div>
        </form>
    )
};

export default Form;