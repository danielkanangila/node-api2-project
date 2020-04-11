import Comment from '../models/Comment';
import Controller from './../lib/Controller';

class CommentsController extends Controller {
    constructor(model) {
        super(model);
        // model refer to Comment model
    }

    index(req, res) {
        if (!req.params.id) {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            return false;
        }
        this.model.findPostComments(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: "The comments information could not be retrieved."
            });
        });
    }

    create(req, res) {
        if (!req.params.id) {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            return false;
        }
        if(!this.validate(req)) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
            return false;
        }
        this.model.create({...req.body, post_id: req.params.id})
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database." });
        })
    }

    validate(req) {
        if (!req.body) return false;
        if (req.body && !req.body.text) return false;
        return true;
    }
}

export default new CommentsController(Comment);

