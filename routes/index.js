const express = require('express');
const rootRouter = express.Router();
const tokenVerification = require('../middleware/tokenAuth');

const user = require('./userRoutes');
const auth = require('./auth');
const checklist = require('./checklist');

//public
rootRouter.use('/api', auth);

//private
rootRouter.use(tokenVerification);
rootRouter.use('/api', user);
rootRouter.use('/api', checklist);

module.exports = rootRouter;
