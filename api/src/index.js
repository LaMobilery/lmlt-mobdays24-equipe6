const express = require('express')
const cors = require('cors')
const env = require('dotenv').config()
const routes = require('./routes')
const mongoose = require('mongoose')
const cron = require('node-cron')
const planningController = require('./controllers/planning.controller')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

mongoose.connect(process.env.MONGO_CONNECTION).then(
    console.log('connected to db')
).catch((e) => {
    console.error(e.message)
})

cron.schedule('*/10 * * * *', async () => {
    await planningController.makePlanning();
})

app.use('/v1', routes);

app.listen(process.env.PORT, () => {
    console.log('App running on http://localhost:3000')
})