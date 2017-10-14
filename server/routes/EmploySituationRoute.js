'use strict';
const EmploySituationController = require('../controllers/EmploySituationController');

module.exports = (app)=>{
    app.route('/employsituations')
    .get(EmploySituationController.getAllEmploySituation);

    app.route('/employsituation/:id')
    .get(EmploySituationController.getEmploySituationById)
    .delete(EmploySituationController.deleteEmploySituation)
    .put(EmploySituationController.updateEmploySituation);

    app.route('/employsituation')
    .post(EmploySituationController.insertEmploySituation);
}
