const express = require('express');
const rootRouter = express.Router();
const tokenVerification = require('../middleware/tokenAuth');

const auth = require('./auth');
const user = require('./userRoutes');
const checklist = require('./checklist');
const orders = require('./order');

//public
rootRouter.use('/api', auth);

//private
rootRouter.use(tokenVerification);
rootRouter.use('/api', user);
rootRouter.use('/api', checklist);
rootRouter.use('/api', orders);

module.exports = rootRouter;
