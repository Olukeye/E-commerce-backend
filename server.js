const express    = require('express')
const mongoose         = require('mongoose')
const morgan     = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const session  = require('express-session');
const cors = require('cors')
const app        = express()
const dotenv = require('dotenv');
dotenv.config();

// Config DB
const { PORT, MONGO_URI} = process.env;

// Connect to Database
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true,
     useUnifiedTopology: true, 
     useCreateIndex:true })
.then(() => console.log('database is connected.'))
.catch(err => console.log(err));
   

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use( expressValidator());
app.use( cors());

//  Routes
const authRouter       = require('./routes/auth') ;
const IdRouter         = require('./routes/get_user_byId');
const categoryRouter   = require('./routes/category');
const productRouter    = require('./routes/product');
const braintreeRouter  = require('./routes/braintree');


// bodyParser
app.use(express.urlencoded({extended: false}));

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// routes middleware
app.use('/api', authRouter)
app.use('/api', IdRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', braintreeRouter)



app.listen(PORT, () =>{
    console.log('server is running on port  ' + PORT)
})
 