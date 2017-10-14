'use strict';
const CityController = require('../controllers/CityController');

module.exports = (app)=>{
    app.route('/city')
    .post(CityController.insertCity);
}
