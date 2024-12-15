const express = require('express')
const connectDB = require('./connectionDb/connectDB')
const clientRoutes = require('./routes/clientRoutes')
const orderRoutes = require('./routes/orderRoutes')
const app = express()
const cors = require('cors')
connectDB()

app.use(express.json());
app.use(cors())
app.use('/api/clients', clientRoutes)
app.use('/api/orders', orderRoutes)

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
