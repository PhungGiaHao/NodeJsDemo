const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    icon:{
        type:String,
        required: true,
    }
},{collection:'categories'})
const Category = mongoose.model('Category',CategorySchema)

CategorySchema.virtual('id').get(function (){
    return this._id
})
CategorySchema.set('toJSON',{
    virtuals:true
})
module.exports = Category