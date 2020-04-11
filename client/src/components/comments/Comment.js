import React from 'react';
import moment from 'moment';

const Comment = ({text, created_at}) => {
    return(
        <div className="comment">
            <p className="comment-contents">{text}</p>
            <p className="comment-date">Posted{moment(created_at, 'YYYY-MM-DD h:m:s').startOf('day').fromNow()}</p>
        </div>
    )
}

export default Comment;