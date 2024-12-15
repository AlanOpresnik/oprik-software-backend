const Client = require("../models/ClientModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Order = require("../models/OrderModel");



const loginClient = async(req,res) => {
    try {
        const { email, password } = req.body;
      
        if (!email || !password) {
            return res.status(400).json({ message: 'Ambos campos son requeridos' });
        }
        
        // Verificar si el cliente existe
        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(404).json({ message: 'Email no encontrado' });
        }
        
        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        
        // Generar un token JWT
        const token = jwt.sign({ id: client._id }, 'SECRET', { expiresIn: '1d' });
        
        // Devolver el token y los datos del cliente
        res.json({ token, client });
         
    }catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}

const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getClientByEmail = async (req, res) => {
    console.log(req.params.email);
    try {
        const client = await Client.findOne({ email: req.params.email });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


const postClient = async (req, res) => {
    try {
        const { name, email, phone, plan, password, avatar } = req.body;

        // Validación de los campos requeridos
        if (!name || !email || !password ) {
            return res.status(400).json({ message: 'Name, email, password, and plan are required.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo cliente
        const client = new Client({
            name,
            email,
            phone,
            plan,
            password: hashedPassword, // Guardar la contraseña cifrada
            avatar
        });

        // Guardar en la base de datos
        await client.save();

        // Responder con el cliente creado
        res.status(201).json({
            message: 'Client created successfully',
            client
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getClientWithOrder = async (req, res) => {
    try {
        const { clientId } = req.params;

        // Buscar cliente por ID
        const client = await Client.findById(clientId);
  
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        // Verificar si el cliente tiene una orden
        if (client.order) {
            // Si tiene una orden, obtener la orden relacionada
            const order = await Order.findById(client.order);
            client.order = order; // Asignar la orden al objeto del cliente
        }
  
        return res.status(200).json({ message: 'Cliente encontrado.', client });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error al obtener el cliente.' });
    }
};


module.exports = {
    getClientById,
    postClient,
    loginClient,
    getClientByEmail,
    getClientWithOrder
};
