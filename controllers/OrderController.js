const Client = require("../models/ClientModel");
const Order = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({ message: 'No hay pedidos' });
        }
        res.status(200).json({ orders })
    } catch (error) {
        console.log(error);
    }
}

const newOrder = async (req, res) => {
    try {

        const { client, plan_name, estimated_delivery_time, price, payment_method, payment_status, status } = req.body;

        if (!client || !plan_name || !estimated_delivery_time || !price || !payment_method || !payment_status || !status) {
            return res.status(400).json({ message: 'Faltan campos obligatorios o están incorrectos.' });
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número mayor a 0.' });
        }

        const newOrder = await Order.create({
            client,
            plan_name,
            estimated_delivery_time,
            price,
            payment_method,
            payment_status,
            status
        });

        // Aquí simplemente asignamos la orden al cliente, no es necesario usar $push
        await Client.findByIdAndUpdate(
            client,
            { order: newOrder._id }, // Asignar el ID de la orden al campo 'order'
            { new: true }
        );

        return res.status(201).json({ message: 'Orden creada y añadida al cliente.', order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error al crear la orden.' });
    }
};
const getOrderById = async (req, res) => {
    const { orderId } = req.params
    console.log(orderId)
    try {
        const order = await Order.findById(orderId).populate('client', 'name email')
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado.' });
        }
        res.status(200).json({ order })
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al buscar la orden.' });
    }
}

module.exports = {
    getAllOrders,
    newOrder,
    getOrderById
}