const express = require('express');
const cors = require('cors');
const env = require('dotenv').config()

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.listen(process.env.PORT, () => {
    console.log('App running on http://localhost:3000')
})