import express from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import path from 'path'

const router = express.Router();
const userController = new UserController();

router.post('/api/login', (req, res) => {
    userController.login(req, res);
});
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/../public/index.html')); 
});

router.post('/api/post', (req, res) => {
    const postController = new PostController(req, res);
    postController.save(req, res);
});

router.get('/api/posts', (req, res) => {
    const postController = new PostController(req, res);
    postController.getPosts(req, res);
});

router.get('/api/post/:postid', (req, res) => {
    const postController = new PostController(req, res);
    postController.getSinglePost(req, res);
});

export default function routes(app) {
    app.use('/', router);
}

