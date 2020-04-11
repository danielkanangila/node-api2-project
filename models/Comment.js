import Database from '../lib/database/database';

class Comment extends Database {
    constructor() {
        super("comments")
    }

    findPostComments(postId) {
        return this.findJoinWith({
            fk: 'post_id',
            value: postId
        }, "posts", "posts.id", "post_id")
    }
}

export default new Comment();