const express = require('express');
const router = express.Router();
const { getOrder, getAllOrder, updateOrder, createOrder } = require('../controllers/order');

router.route('/order/:id').get(getOrder).put(updateOrder);
router.route('/order').get(getAllOrder).post(createOrder);

module.exports = router;
