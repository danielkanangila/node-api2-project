import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from './../Form';
import Comment from './Comment';

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (postId) {
            axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err.response));
        }
    }, [postId]);

    const updateState = (data) => {
        setComments([
            ...comments,
            data[0]
        ])
    }

    return(
        <div className="comments">
            <Form 
                updateState={updateState} 
                defaultState={{title: ""}}
                from="comments" />
            <h2 className="comments-title">Comments</h2>
            {comments.map((comment, index) => <Comment key={index} {...comment} />)}
        </div>
    )
}

export default Comments;