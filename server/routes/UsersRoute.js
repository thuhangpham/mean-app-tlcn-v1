'use strict';
const UsersController = require('../controllers/UsersController.js');
const auth = require('../middle-wares/verify-token');
module.exports = (app)=>{
    app.route('/users')
    .get(UsersController.getAllUser);

    app.route('/user/:id')
    .get(UsersController.getUserById)
    .delete(UsersController.deleteUser)
    .put(UsersController.updateUser);

    app.route('/user')
    .post(UsersController.insertUser);
    
    app.route('/user/authenticate')
    .post(UsersController.authentication);

    app.post('/verify',auth,UsersController.verify)
}
