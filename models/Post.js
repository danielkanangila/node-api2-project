import Database from '../lib/database/database';

class Post extends Database {
    constructor() {
        super("posts")
    }
}

export default new Post();