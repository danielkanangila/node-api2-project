import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Form = ({defaultState, updateState, from}) => {
    const [newPost, setNewPost] = useState(defaultState);
    const [formTitle, setFormTitle] = useState('Add new post')
    const API_URL = process.env.REACT_APP_API_URL + '/posts';

    useEffect(() => {
        setNewPost(defaultState);   
        switch(from) {
            case 'posts':
                setFormTitle('Add new post');
                break;
            case 'post':
                setFormTitle('Edit');
                break;
            case 'comments':
                setFormTitle('Add comments');
        }
    }, [defaultState, from])

    const handleChange = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const reset = e => {
        if (e) e.preventDefault();
        setNewPost({name: "", bio: ""});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const isEdit = !(!newPost.id);
        const url = isEdit ? `${API_URL}/${newPost.id}` : API_URL;
        const method = isEdit ? 'put' : 'post';
        axios[method](url, newPost)
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
                        type="text" name="name" 
                        value={newPost.title}/>
                    <label>Title</label>
                </div>
            }
            <div className="field">
                <textarea 
                    onChange={handleChange} 
                    name="content" 
                    value={newPost.contents}>    
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