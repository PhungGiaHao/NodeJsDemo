const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    icon: {
        type: String,
        required: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    Featured:{
        type:Boolean,
        default:false,
    },
    CountInstock:{
        type:Number,
        default:0
    }
},{collection:"Products"})
ProductsSchema.virtual('id').get(function () {
    return this._id.toHexString();
})
ProductsSchema.set('toJSON',{
    virtuals:true
})

const Product = mongoose.model("Products",ProductsSchema)

module.exports = Product