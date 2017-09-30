'use strict';
const UsersController = require('../controllers/UsersController.js');

module.exports = (app)=>{
    app.route('/users')
    .get(UsersController.getAllUser);

    app.route('/user/:id')
    .get(UsersController.getUserById)
    .delete(UsersController.deleteUser)
    .put(UsersController.updateUser);

    app.route('/user')
    .post(UsersController.insertUser);
    console.log(' Users ');
}
