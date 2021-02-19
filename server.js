const express    = require('express')
const db         = require('./database/mongoose')
const morgan     = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const app        = express()

require('dotenv').config


// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use( expressValidator())
app.use( cors())

//  Routes
const authRouter       = require('./routes/auth') 
const IdRouter         = require('./routes/get_user_byId')
const categoryRouter   = require('./routes/category')
const productRouter    = require('./routes/product')
const braintreeRouter  = require('./routes/braintree')

// routes middleware
app.use('/api', authRouter)
app.use('/api', IdRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', braintreeRouter)



const port = process.env.PORT || 2020
app.listen(port, () =>{
    console.log('server is running on port  ' + port)
})
 