const express = require('express');
const OrderController = require('../controllers/OrderController')
const router = express.Router();

router.get('/getOrders', OrderController.getAllOrders)
router.post('/create', OrderController.newOrder)
router.get('/getOrderById/:orderId', OrderController.getOrderById)
module.exports = router;
