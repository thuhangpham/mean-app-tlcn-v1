'use strict';
const PostController = require('../controllers/PostController.js');

module.exports = (app)=>{
    app.route('/posts')
    .get(PostController.getAllPost);

    app.route('/post/:id')
    .get(PostController.getPostById)
    .delete(PostController.deletePost)
    .put(PostController.updatePost);

    app.route('/post')
    .post(PostController.insertPost);
}
