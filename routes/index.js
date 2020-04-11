import express from 'express';
import PostsController from "./../controllers/PostsController";
import CommentsController from "./../controllers/CommentsController";

const routes = express.Router();

routes.get('/posts', PostsController.index.bind(PostsController));
routes.post('/posts', PostsController.create.bind(PostsController));
routes.get('/posts/:id', PostsController.show.bind(PostsController));
routes.put('/posts/:id', PostsController.update.bind(PostsController));
routes.delete('/posts/:id', PostsController.delete.bind(PostsController));

routes.get('/posts/:id/comments', CommentsController.index.bind(CommentsController));
routes.post('/posts/:id/comments', CommentsController.create.bind(CommentsController));

export default routes;
