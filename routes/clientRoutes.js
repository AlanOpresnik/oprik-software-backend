const express = require('express');
const clientController = require('../controllers/clientController'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Define la ruta y asigna la función del controlador
router.get('/getById/:id', clientController.getClientById);
router.post('/newClient', clientController.postClient);
router.post('/login', clientController.loginClient)
router.get('/getClientByEmail/:email', clientController.getClientByEmail)
router.get('/getClientOrder/:clientId' , clientController.getClientWithOrder)
module.exports = router;
