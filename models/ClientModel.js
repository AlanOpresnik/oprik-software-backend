const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderDate: {
        type: String,
        default: ''
    }
});

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    plan: {
        type: [PlanSchema], // Referencia al esquema de planes
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
    },
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
