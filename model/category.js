const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema(
    {
        name:{
            type:'String',
            require:true,
            trim:true,
            maxlength:41,
            unique: true
        }
   
    },
    {
      timestamps:true
    }
)

module.exports = mongoose.model('Category', categorySchema)