import Post from '../models/Post';
import Controller from './../lib/Controller';

class PotsController extends Controller {
    constructor(model) {
        super(model);
        // model refer to Post model class
    }

    index(req, res) {
        this.model.findall()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "The posts information could not be retrieved."
            });
        });
    }

    show(req, res) {
        if (!req.params.id) {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            return false;
        }
        this.model.findone(req.params.id)
        .then(post => {
            if (!post || !post.length) {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
                return false;
            }
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "The post information could not be retrieved." });
        });
    }

    create(req, res) {
        if(!this.validate(req)) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            return false;
        }
        this.model.create(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database." });
        })
    }

    update(req, res) {
        if (!req.params.id) {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            return false;
        }
        if(!this.validate(req)) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            return false;
        }
        this.model.update(req.params.id, req.body)
        .then(post => {
            if (!post || !post.length) {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
                return false;
            }
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }

    delete(req, res) {
        if (!req.params.id) {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            return false;
        }
        this.model.delete(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "The post has been deleted"});
            } else {
                res.status(404).json({errorMessage: "The post could not be found."});
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
    }

    validate(req) {
        if (!req.body) return false;
        if (req.body && !req.body.title) return false;
        if (req.body && !req.body.contents) return false;
        return true;
    }
}

export default new PotsController(Post);

