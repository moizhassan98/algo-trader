require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const firebase = require('./firebase')
const db = require('./db')
const binanceRouter = require('./routes/binance-router')
const frontendRouter = require('./routes/frontend-router')
const checkAuth = require('./controllers/frontend/check-auth')



const app = express()
const apiPort = 5000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use('/api/v1',checkAuth)

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/getauth',(req,res)=>{
    res.send('Auth\'d')
})

app.use('/api', binanceRouter)
app.use('/api/v1', frontendRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
