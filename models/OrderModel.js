const mongoose = require('mongoose');

// Define constantes para los valores permitidos
const PAYMENT_STATUS = ['PENDING', 'COMPLETED', 'FAILED'];
const ORDER_STATUS = ['NOT_CONFIRMED', 'DEVELOPING_PHASE', 'SUCCESSFUL'];
const PAYMENT_METHODS = ['MERCADO_PAGO', 'EFECTIVO'];

const OrderSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: true,
        },
        plan_name: {
            type: String,
            required: true,
        },
        estimated_delivery_time: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        payment_method: {
            type: String,
            enum: PAYMENT_METHODS,
            required: true,
        },
        payment_status: {
            type: String,
            enum: PAYMENT_STATUS,
            default: 'PENDING',
            required: true,
        },
        payment_date: {
            type: String,
        },
        status: {
            type: String,
            enum: ORDER_STATUS,
            default: 'NOT_CONFIRMED',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order 