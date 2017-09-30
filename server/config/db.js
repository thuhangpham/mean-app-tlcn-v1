const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.DB_HOST)
.then(()=>{console.log('Connect successful!')})
.catch((err)=>{console.log(`Connect db err: ${err}`)});
module.exports = mongoose;