'use strict';
const AreaExController = require('../controllers/AreasExperController');

module.exports = (app)=>{
    app.route('/areaexs')
    .get(AreaExController.getAllAreaEx);

    app.route('/areaex/:id')
    .get(AreaExController.getAreaExById)
    .delete(AreaExController.deleteAreaEx)
    .put(AreaExController.updateAreaEx);

    app.route('/areaex')
    .post(AreaExController.insertAreaEx);
}
