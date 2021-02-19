const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/E-COMMERCE', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
})