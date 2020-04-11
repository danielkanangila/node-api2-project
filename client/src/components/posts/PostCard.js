import React, {useState} from 'react';
import { Link, useLocation} from 'react-router-dom';
import Form from '../Form';
import moment from 'moment';

const PostCard = (props) => {
    const [postToEdit, setPostToEdit] = useState(null);
    const {updateState, defaultFormData, ...rest} = props;
    return(
        <div className="post-wrapper">
            {postToEdit && 
                <Form 
                    updateState={updateState} 
                    defaultState={postToEdit}
                    from="edit" />
            }
            {!postToEdit &&
                <PostContent {...rest} setPostToEdit={setPostToEdit} />
            }
        </div>
    )
}

const PostContent = ({id, title, contents, created_at, setPostToEdit, deletePost}) => {
    const location = useLocation();
    return(
        <div className="post">
            {location.pathname === '/' && 
                <Link className="post-link" to={`/posts/${id}`}></Link>
            }
            <h2 className="post-title">{contents}</h2>
            <p className="post-contents">{title}</p>
            <p className="post-date">Posted {moment(created_at, 'YYYY-MM-DD h:m:s').startOf('day').fromNow()}</p>
            {location.pathname !== '/' && 
                <p className="post-action">
                    <span 
                        onClick={() => setPostToEdit({id, title, contents})} 
                        className="btn btn-primary small lightenblue">
                            Edit
                    </span>
                    <span onClick={e => deletePost(id)} className="btn btn-danger small lightenred">Delete</span>
                </p>
            }
        </div>
    )
}

export default PostCard;