const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
            if (err) { //failed verification.
                console.log(err);
                return res.json({"result": 0});
            }
            req.decoded = decoded;
            console.log(decoded);
            //console.log((new Date()).getMilliseconds());
            next(); //no error, proceed
        });
        
    } else {
        // forbidden without token
        return res.status(403).send({
            "result": 0
        });
    }
}